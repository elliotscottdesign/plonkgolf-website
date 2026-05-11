import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { BOOKINGS, VENUES, fmtMoney, fmtDate, fmtTime } from "@/lib/mockData";

export default function RefundsPage() {
  const refundable = BOOKINGS.filter((b) => b.status === "confirmed").slice(0, 10);
  const refunded = BOOKINGS.filter((b) => b.status === "refunded");

  return (
    <>
      <AdminPageHeader
        title="Refunds"
        description="Refund a booking — full or partial. Stripe processes the refund within 5–10 working days."
      />
      <PreviewBanner />

      <AdminCard
        title="Recent refunds"
        action={
          <span className="text-xs text-cream/55">
            {refunded.length} refund{refunded.length === 1 ? "" : "s"} on record
          </span>
        }
      >
        {refunded.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-cream/55">
            No refunds processed yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                  <th className="px-5 py-3 font-bold">Ref</th>
                  <th className="px-5 py-3 font-bold">Slot</th>
                  <th className="px-5 py-3 font-bold">Customer</th>
                  <th className="px-5 py-3 font-bold">Amount</th>
                  <th className="px-5 py-3 text-right font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {refunded.map((b) => (
                  <tr key={b.id} className="border-b border-cream/5 last:border-b-0">
                    <td className="px-5 py-3 font-mono text-xs">{b.reference}</td>
                    <td className="px-5 py-3 text-xs text-cream/85">{fmtDate(b.slotTime)} · {fmtTime(b.slotTime)}</td>
                    <td className="px-5 py-3">{b.customerName}</td>
                    <td className="px-5 py-3 font-medium text-red-300">−{fmtMoney(b.totalPence)}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs font-semibold uppercase tracking-wider text-plonkYellow hover:underline">
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      <div className="mt-8">
        <AdminCard title="Find a booking to refund">
          <div className="border-b border-cream/10 px-5 py-3">
            <input
              type="search"
              placeholder="Search by reference, email, or name…"
              className="w-full rounded-full border border-cream/15 bg-ink/40 px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-plonkPink focus:outline-none"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                  <th className="px-5 py-3 font-bold">Ref</th>
                  <th className="px-5 py-3 font-bold">Slot</th>
                  <th className="px-5 py-3 font-bold">Venue</th>
                  <th className="px-5 py-3 font-bold">Customer</th>
                  <th className="px-5 py-3 font-bold">Amount</th>
                  <th className="px-5 py-3 text-right font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {refundable.map((b) => (
                  <tr key={b.id} className="border-b border-cream/5 last:border-b-0 hover:bg-cream/5">
                    <td className="px-5 py-3 font-mono text-xs">{b.reference}</td>
                    <td className="px-5 py-3 text-xs text-cream/85">{fmtDate(b.slotTime)} · {fmtTime(b.slotTime)}</td>
                    <td className="px-5 py-3 text-xs text-plonkYellow">
                      {VENUES.find((v) => v.id === b.venueId)?.name.replace("Plonk ", "")}
                    </td>
                    <td className="px-5 py-3">{b.customerName}</td>
                    <td className="px-5 py-3 font-medium">{fmtMoney(b.totalPence)}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="rounded-full bg-red-400/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-300 hover:bg-red-400/25">
                        Refund
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      </div>
    </>
  );
}
