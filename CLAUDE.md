# CLAUDE.md — plonkgolf-website

This is the **Plonk Golf public website** repo (plonkgolf.co.uk) — Next-gen static site
replacing the old WordPress build, deployed via GitHub Pages. It is a **separate repo**
from the No Dice team platform (`Plonk-Borough-2.0`, deployed at team.nodice.bar), but
shares the same Supabase project (`rntcujcpsozvuxvmlejv`) for bookings/tickets/availability.
CMS content (`page_content`, `gallery_images`) is **site-scoped** (`site='plonk'` vs
`'nodice'`) so the two brands never bleed into each other.

## The `lithos` lane — handover to Lithos Digital (READ FIRST)

If `git branch --show-current` says `section/lithos`, you are the **Lithos-handover
session** (folder `Sites/nodice/team-sessions/lithos`). Your job is everything involved
in handing this site to **Lithos Digital** (the external web agency, Athens — contact
`a.meksis@lithosdigital.gr`; they historically ran Plonk's WordPress hosting + the
SEO/outreach retainer):

- **[HANDOFF.md](HANDOFF.md) is the handover doc** — keep it accurate as things change
  (DNS cutover steps WordPress → GitHub Pages, Supabase admin + login pattern, where
  Stripe keys live, CMS how-to, the `site` column story).
- Support the cutover: DNS steps, SEO redirects from old WordPress URLs, sitemap/robots/
  meta polish, business listings — give Lithos a clean base.
- Answer Lithos's questions by improving the docs, not one-off replies.
- Ongoing: anything the founder routes to "the Lithos session".

**Founder-context flags:** Lithos's £2,372.73 invoice was paid from No Dice Hackney Ltd
but is Plonk-legacy work — the entity question sits with the accountant (finance lane
owns that thread; don't re-litigate it here, just don't contradict it in docs).

## Working style (same as the team platform)

- The founder is **non-technical**: plain English, no jargon, one concrete step at a time.
- **"Commit" = ship in ONE step**: commit to `section/lithos` → `git fetch origin` →
  merge `origin/main` → merge your branch into `main` → `git push origin main`. Never
  leave finished work only on the branch when they say commit/ship.
- Never expose secrets in this repo's docs — HANDOFF.md points at where keys LIVE, it
  never contains them.
- The full multi-session system (all lanes, which folder is which) is documented in the
  team platform repo: `Plonk-Borough-2.0/SESSIONS.md` + its CLAUDE.md "Parallel sessions".
