import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { BOOKINGS, fmtMoney } from "@/lib/mockData";

type CustomerRow = {
  email: string;
  name: string;
  bookings: number;
  heads: number;
  totalSpent: number;
  lastVisit: string | null;
  nextVisit: string | null;
};

function aggregateCustomers(): CustomerRow[] {
  const map = new Map<string, CustomerRow>();
  const now = Date.now();
  for (const b of BOOKINGS) {
    if (b.status !== "confirmed") continue;
    const r = map.get(b.customerEmail) || {
      email: b.customerEmail,
      name: b.customerName,
      bookings: 0,
      heads: 0,
      totalSpent: 0,
      lastVisit: null,
      nextVisit: null,
    };
    r.bookings += 1;
    r.heads += b.partySize;
    r.totalSpent += b.totalPence;
    const t = new Date(b.slotTime).getTime();
    if (t < now) {
      if (!r.lastVisit || new Date(r.lastVisit).getTime() < t) r.lastVisit = b.slotTime;
    } else {
      if (!r.nextVisit || new Date(r.nextVisit).getTime() > t) r.nextVisit = b.slotTime;
    }
    map.set(b.customerEmail, r);
  }
  return [...map.values()].sort((a, b) => b.totalSpent - a.totalSpent);
}

const FMT = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "—";

export default function CustomersPage() {
  const rows = aggregateCustomers();

  return (
    <>
      <AdminPageHeader
        title="Customers"
        description="Everyone who's booked, sorted by total spend. Click any row for booking history and notes."
        action={
          <div className="flex gap-2">
            <input
              type="search"
              placeholder="Search by email or name…"
              className="rounded-full border border-cream/15 bg-ink/40 px-4 py-2 text-xs text-cream placeholder:text-cream/40 focus:border-plonkPink focus:outline-none"
            />
            <button className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
              Export CSV
            </button>
          </div>
        }
      />
      <PreviewBanner />

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                <th className="px-5 py-3 font-bold">Customer</th>
                <th className="px-5 py-3 font-bold">Bookings</th>
                <th className="px-5 py-3 font-bold">Heads</th>
                <th className="px-5 py-3 font-bold">Total spent</th>
                <th className="px-5 py-3 font-bold">Last visit</th>
                <th className="px-5 py-3 font-bold">Next visit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email} className="border-b border-cream/5 last:border-b-0 hover:bg-cream/5">
                  <td className="px-5 py-3">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-cream/55">{r.email}</p>
                  </td>
                  <td className="px-5 py-3 text-cream/85">{r.bookings}</td>
                  <td className="px-5 py-3 text-cream/85">{r.heads}</td>
                  <td className="px-5 py-3 font-medium">{fmtMoney(r.totalSpent)}</td>
                  <td className="px-5 py-3 text-xs text-cream/65">{FMT(r.lastVisit)}</td>
                  <td className="px-5 py-3 text-xs text-cream/65">{FMT(r.nextVisit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <p className="mt-6 text-xs text-cream/50">
        Customer rows are aggregated by email. Repeat bookings, average party size, and revenue tier appear here automatically once bookings come through Stripe.
      </p>
    </>
  );
}
