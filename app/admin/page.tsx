import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import {
  BOOKINGS,
  VENUES,
  fmtMoney,
  fmtDate,
  fmtTime,
} from "@/lib/mockData";

function isSameDay(iso: string, ref: Date) {
  const d = new Date(iso);
  return (
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth() === ref.getMonth() &&
    d.getDate() === ref.getDate()
  );
}

export default function DashboardPage() {
  const today = new Date();
  const todays = BOOKINGS.filter(
    (b) => isSameDay(b.slotTime, today) && b.status === "confirmed",
  );
  const todaysRevenue = todays.reduce((s, b) => s + b.totalPence, 0);
  const todaysHeads = todays.reduce((s, b) => s + b.partySize, 0);

  const next7 = BOOKINGS.filter((b) => {
    const t = new Date(b.slotTime).getTime();
    return t >= today.getTime() && t <= today.getTime() + 7 * 24 * 3600 * 1000 && b.status === "confirmed";
  });
  const next7Revenue = next7.reduce((s, b) => s + b.totalPence, 0);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Snapshot of today and the week ahead."
      />
      <PreviewBanner />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Today's revenue" value={fmtMoney(todaysRevenue)} sub={`${todays.length} bookings`} />
        <Tile label="Today's golfers" value={todaysHeads.toString()} sub="confirmed heads" />
        <Tile label="Next 7 days revenue" value={fmtMoney(next7Revenue)} sub={`${next7.length} bookings`} />
        <Tile label="Active venues" value={VENUES.length.toString()} sub="Hackney + Borough" />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <AdminCard
          title="Today's bookings"
          action={
            <Link
              href="/admin/bookings"
              className="text-xs font-semibold uppercase tracking-wider text-plonkYellow hover:underline"
            >
              All bookings →
            </Link>
          }
        >
          {todays.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-cream/55">
              No bookings today.
            </p>
          ) : (
            <ul className="divide-y divide-cream/5">
              {todays.map((b) => (
                <li key={b.id} className="flex items-center justify-between px-5 py-3 text-sm">
                  <div>
                    <p className="font-medium">{b.customerName}</p>
                    <p className="text-xs text-cream/55">
                      {fmtTime(b.slotTime)} · {VENUES.find((v) => v.id === b.venueId)?.name} · {b.partySize} people
                    </p>
                  </div>
                  <span className="text-sm text-cream/85">{fmtMoney(b.totalPence)}</span>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard title="Quick actions">
          <ul className="divide-y divide-cream/5">
            {[
              { label: "Edit ticket prices", href: "/admin/tickets" },
              { label: "Block a date (private hire / holiday)", href: "/admin/closed" },
              { label: "Create a promo code", href: "/admin/promos" },
              { label: "Issue a gift voucher", href: "/admin/vouchers" },
              { label: "View calendar of bookings", href: "/admin/bookings/calendar" },
            ].map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="block px-5 py-3 text-sm text-cream/80 transition hover:bg-cream/5 hover:text-cream"
                >
                  {a.label} →
                </Link>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>

      <div className="mt-8">
        <AdminCard title="Next 7 days">
          <ul className="divide-y divide-cream/5">
            {next7.map((b) => (
              <li key={b.id} className="grid grid-cols-12 items-center gap-4 px-5 py-3 text-sm">
                <span className="col-span-3 text-xs text-cream/55">{fmtDate(b.slotTime)} · {fmtTime(b.slotTime)}</span>
                <span className="col-span-2 text-xs text-plonkYellow">{VENUES.find((v) => v.id === b.venueId)?.name.replace("Plonk ", "")}</span>
                <span className="col-span-4">{b.customerName}</span>
                <span className="col-span-1 text-xs text-cream/55">{b.partySize} ppl</span>
                <span className="col-span-2 text-right text-cream/85">{fmtMoney(b.totalPence)}</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-cream/10 bg-ink/40 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      {sub && <p className="mt-1 text-xs text-cream/55">{sub}</p>}
    </div>
  );
}
