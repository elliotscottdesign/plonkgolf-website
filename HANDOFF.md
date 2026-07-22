# Plonk Golf — Site Handoff

Written 2026-07-22 for **Lithos Digital** (Greece) — the SEO + web management firm taking over `plonkgolf.co.uk` post-relaunch. This document is the single reference for what the site is, how it deploys, and everything Lithos will need to operate it. Please read once end-to-end before touching DNS.

## Site owner

- **Company:** No Dice Bars Ltd (parent) → **Plonk Golf Ltd** (operating company for the golf brand)
- **Founder / decision-maker:** Elliot Scott — `elliot@nodice.bar`
- **Repo owner:** `elliotscottdesign` on GitHub

Push access, GH Pages access, and Cloudflare DNS access will be granted to Lithos on request. Supabase service_role key, Stripe secret key, and SMTP credentials remain with the founder — Lithos does not need them for standard operation.

## What this site is

`plonkgolf.co.uk` — Plonk's marketing site plus a custom booking system that sells mini-golf tee times. Replaces a WordPress + Design My Night stack that ran for 14 years.

**Stack:**
- Next.js 14 (App Router, TypeScript), static export (`output: "export"`)
- Tailwind CSS
- Supabase Postgres — bookings, tickets, availability, page content, galleries
- Stripe Checkout (Payment Element) — customer payments
- Gmail SMTP via `denomailer` (Supabase Edge Function) — booking confirmations

**Current state (2026-07-22):**
- One venue open: **Plonk Hackney**, London Fields, E8 3PH (arch 407, Mentmore Terrace)
- Plonk Borough Market is closed — all Borough references removed from public copy. The `venue` type union in `lib/db/catalogue.ts` and admin metadata still reference "borough" as dormant scaffolding for when it reopens.
- Booking flow live and pulling real availability from Supabase
- Site is built and served, but plonkgolf.co.uk DNS still points at legacy WordPress — Lithos's first job is the cutover.

## Repo, deploy pipeline, and preview URL

- **Repo:** https://github.com/elliotscottdesign/plonkgolf-website
- **CI:** GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main` and publishes to GitHub Pages
- **Preview URL (pre-cutover):** https://elliotscottdesign.github.io/plonkgolf-website/
- **Target URL (post-cutover):** https://plonkgolf.co.uk

A Cloudflare Workers config (`wrangler.toml`) also exists for a Workers deploy if that path is preferred long-term — the workflow currently ships to Pages.

### Local dev

```bash
git clone git@github.com:elliotscottdesign/plonkgolf-website.git
cd plonkgolf-website
npm install
npm run dev   # http://localhost:3000
```

No `.env` file needed for local dev — Supabase URL + anon key are hardcoded fallbacks in `lib/supabase.ts` (safe to embed, RLS-protected). To rotate them, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars.

## DNS cutover to plonkgolf.co.uk

Current state:
- `plonkgolf.co.uk` → WordPress hosted somewhere, DNS on Cloudflare
- Confirmed via `curl -sI https://plonkgolf.co.uk` returning `x-redirect-by: WordPress` + `server: cloudflare`

Cutover steps (recommended order):

1. **Do the SEO audit FIRST.** Pull top URLs, queries, click-through rates from Google Search Console for the current plonkgolf.co.uk. Identify the ~50 URLs driving the most organic traffic. These are the URLs that MUST either exist verbatim on the new site or 301-redirect to their closest match. Do this before cutover so no ranking is lost.
2. **Prepare 301 redirect table.** Old URL → new URL. Examples of likely-needed maps:
   - `/hackney/` → `/venue/hackney/`
   - `/borough-market/` → `/venue/hackney/` (or a "Borough coming back" page if Lithos prefers to preserve the URL)
   - `/parties/` → `/private-hire/`
   - `/parties/hackney/` → `/private-hire/hackney/`
   - `/book-now/` → `/book/hackney/`
   - Blog posts / any content URLs — decide per URL whether to port content or redirect
3. **Set up the redirect layer.** GitHub Pages does NOT support server-side redirects. Two options:
   - **Cloudflare Workers (recommended)** — since Cloudflare already fronts the domain, a small Worker in front of GH Pages can 301 the old URL map before the request hits Pages. Lithos will know this pattern.
   - **Client-side `<meta http-equiv="refresh">`** — only if URL count is small (Google treats these as ~301 but ranks less well).
4. **Add custom domain to GitHub Pages.** In repo Settings → Pages, set `plonkgolf.co.uk` as the custom domain. GitHub will write a `CNAME` file to the repo.
5. **Update Cloudflare DNS:**
   - Apex `plonkgolf.co.uk` → GitHub Pages IPs (A records): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www.plonkgolf.co.uk` → CNAME `elliotscottdesign.github.io`
   - Enforce HTTPS on the GH Pages repo settings once DNS propagates
6. **Test in incognito.** Confirm every top-50 URL loads or redirects correctly. Watch Google Search Console over the following weeks for crawl errors.
7. **Retire WordPress** once traffic has migrated cleanly (~4–6 weeks of stable DNS).

The nodice.bar site (built by the same team) followed the same GH Pages + Cloudflare pattern — reference commits `1cc2256` and prior. Ask the founder for read access to that repo if a working example helps.

## Supabase back-end

This site shares a Supabase project with `nodice.bar` (the No Dice Bars sister site). **This is intentional** — Plonk Hackney is the golf brand operating at the No Dice bar venue, and one Supabase project keeps bookings on one calendar. But the content tables (`page_content`, `gallery_images`) are per-site scoped so the two brands don't collide.

- **Project ID:** `rntcujcpsozvuxvmlejv`
- **Admin URL:** https://supabase.com/dashboard/project/rntcujcpsozvuxvmlejv
- **Anon key:** embedded in `lib/supabase.ts` (safe to share, RLS-protected)
- **Service role key:** with the founder — needed only for Edge Function env vars, never client-side

Access will be granted to Lithos on request.

### The `site` column story (important for anyone adding admin pages)

Every row in `page_content` and `gallery_images` carries a `site text not null` column. Values:
- `nodice` — belongs to nodice.bar
- `plonk` — belongs to plonkgolf.co.uk

Both sites' code filters every read by `site` and tags every write with `site`. Lithos-authored code that touches these tables MUST do the same. There is a shared constant at `lib/site.ts`:

```typescript
export const SITE = "plonk";
```

Import it wherever you read/write `page_content` or `gallery_images`:

```typescript
// Read
await supabase().from("page_content").select("*").eq("site", SITE).eq("key", "home.hero.title");

// Write
await supabase().from("page_content").insert({ site: SITE, key, value, ... });
```

If you forget the filter on a read, you'll see No Dice's content on the Plonk site. If you forget the tag on a write, the row will land in No Dice's namespace (or fail the composite PK). Bookings, tickets, venues, addons and every business-data table are NOT site-scoped — they're intentionally shared.

### Tables to know about

| Table | Purpose | Site-scoped? |
|---|---|---|
| `venues` | Hackney / Borough — the physical courses | No (shared) |
| `tickets` | Products sold ("Drink Golf & Game", "Hackney Fun Club") | No (shared) |
| `addons` | Add-on items on a booking | No (shared) |
| `bookings` | Customer bookings | No (shared) |
| `booking_slots` | Per-timeslot capacity holds | No (shared) |
| `page_content` | All editable copy | **Yes — filter by `site`** |
| `gallery_images` | Image galleries + hero sliders | **Yes — filter by `site`** |

## Stripe

- LIVE publishable key `pk_live_...` embedded in the Next.js build (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in `.github/workflows/deploy.yml`)
- Secret key `sk_live_...` — Supabase Edge Function env only, with the founder
- To roll to test mode, swap for `pk_test_...` in the workflow

Real money flows through every Checkout session this build creates. Do not run production builds locally unless you know what you're doing.

## Admin panel

`/admin/*` — the founder + Lithos edit content, view bookings, add tickets, manage promos.

- Auth: same Supabase auth used by the booking flow
- Every admin query already goes through `lib/db/content.ts` and `lib/db/galleries.ts`, both of which respect the `SITE` filter — so Lithos-added admin pages inherit correct scoping automatically as long as they use those helpers
- Click-to-edit (Editable component) works on every public page for logged-in admins

## SMTP / booking confirmations

- Sender: Gmail SMTP via `bookings@plonkgolf.co.uk` App Password
- Function: `send-booking-confirmation` Supabase Edge Function
- The confirmation email uses the **venue name** from the DB (`booking.venue.name`) as both the "From:" name and the body signature — so an email sent for a Plonk Hackney booking says "From: Plonk Hackney" and signs off "The Plonk Hackney team". When Borough reopens, it'll say "Plonk Borough" automatically.

## What the founder is keeping vs handing over

**Founder keeps direct control of:**
- Supabase service_role key + Edge Function secrets
- Stripe account + secret key
- SMTP App Password for `bookings@plonkgolf.co.uk`
- GitHub org / repo ownership

**Handing to Lithos:**
- Push access to `elliotscottdesign/plonkgolf-website`
- GitHub Pages settings for the repo
- Cloudflare DNS admin for `plonkgolf.co.uk`
- Supabase Dashboard read access + admin panel logins
- Ongoing SEO ownership: Google Search Console, structured data, sitemap, meta tags, redirects, page speed

**Not currently handed over — happy to grant if Lithos wants it:**
- Google Analytics / GA4
- Google Business Profile for the Hackney venue

## Known gaps + follow-ups

Some things that are worth Lithos knowing weren't finished in the pre-handoff sprint:

1. **`sitemap.xml` and `robots.txt`** — not yet generated. Should be per-page for every route the site exposes.
2. **Structured data (JSON-LD)** — Business hours, address, LocalBusiness schema not wired. Big SEO win with modest effort.
3. **Meta tags** — every page has a basic `<title>` and `<meta description>`, but Open Graph / Twitter Card meta is inconsistent.
4. **Content is still light** — the site launched with the Plonk brand voice from the fork's original scaffold. Founder is available to help write venue-specific copy that reflects the current single-venue operation.
5. **`lib/db/catalogue.ts`** still lists `borough` in the `Venue` type union and `lib/imageSpecs.ts` still has borough image dimensions — dormant scaffolding for the Borough return, doesn't affect anything user-facing today.
6. **Two Edge Functions have code committed but not yet redeployed to Supabase** — `events-feed` and `send-booking-confirmation`. Founder will deploy these; Lithos doesn't need to touch them but should be aware they exist.

## First 30 days — suggested Lithos milestones

1. **Week 1:** SEO audit + 301 redirect table
2. **Week 2:** DNS cutover (staged: Monday morning, monitor GSC through the week)
3. **Week 3:** Sitemap, robots.txt, JSON-LD structured data
4. **Week 4:** Content review pass with the founder + first monthly performance report

---

Questions to `elliot@nodice.bar`. This document lives in the repo at `/HANDOFF.md` — please push updates back to `main` as details evolve.
