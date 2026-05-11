import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { BOOKINGS, VENUES, fmtMoney, fmtDate, fmtTime } from "@/lib/mockData";

export default function BookingsPage() {
  const sorted = [...BOOKINGS].sort(
    (a, b) => new Date(a.slotTime).getTime() - new Date(b.slotTime).getTime(),
  );

  return (
    <>
      <AdminPageHeader
        title="Bookings"
        description="Every booking taken. Click a row to see customer details."
        action={
          <div className="flex gap-2">
            <Link
              href="/admin/bookings/calendar"
              className="rounded-full border border-cream/15 px-5 py-2 text-xs font-bold uppercase tracking-wider text-cream/85 hover:bg-cream/5"
            >
              Calendar view
            </Link>
            <button className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
              Export CSV
            </button>
          </div>
        }
      />
      <PreviewBanner />

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <Filter label="All" active />
        <Filter label="Confirmed" />
        <Filter label="Cancelled" />
        <Filter label="Refunded" />
        <span className="mx-2 text-cream/30">·</span>
        <Filter label="Both venues" active />
        <Filter label="Hackney" />
        <Filter label="Borough" />
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                <th className="px-5 py-3 font-bold">Ref</th>
                <th className="px-5 py-3 font-bold">Slot</th>
                <th className="px-5 py-3 font-bold">Venue</th>
                <th className="px-5 py-3 font-bold">Customer</th>
                <th className="px-5 py-3 font-bold">Size</th>
                <th className="px-5 py-3 font-bold">Total</th>
                <th className="px-5 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((b) => (
                <tr key={b.id} className="border-b border-cream/5 last:border-b-0 hover:bg-cream/5">
                  <td className="px-5 py-3 font-mono text-xs">{b.reference}</td>
                  <td className="px-5 py-3 text-xs text-cream/85">
                    {fmtDate(b.slotTime)} · {fmtTime(b.slotTime)}
                  </td>
                  <td className="px-5 py-3 text-plonkYellow text-xs">
                    {VENUES.find((v) => v.id === b.venueId)?.name.replace("Plonk ", "")}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{b.customerName}</p>
                    <p className="text-xs text-cream/55">{b.customerEmail}</p>
                  </td>
                  <td className="px-5 py-3 text-cream/85">{b.partySize}</td>
                  <td className="px-5 py-3 font-medium">{fmtMoney(b.totalPence)}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </>
  );
}

function Filter({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`rounded-full border px-3 py-1 ${
        active
          ? "border-plonkPink bg-plonkPink/15 text-cream"
          : "border-cream/15 text-cream/70 hover:bg-cream/5"
      }`}
    >
      {label}
    </button>
  );
}

function StatusPill({ status }: { status: "confirmed" | "cancelled" | "refunded" }) {
  const styles: Record<typeof status, string> = {
    confirmed: "bg-plonkTeal/15 text-plonkTeal",
    cancelled: "bg-cream/10 text-cream/60",
    refunded: "bg-red-400/15 text-red-300",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
}
