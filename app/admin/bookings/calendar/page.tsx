import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { BOOKINGS, VENUES, fmtMoney, fmtTime } from "@/lib/mockData";

function startOfWeek(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const day = x.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  x.setDate(x.getDate() + diff);
  return x;
}

export default function CalendarPage() {
  const monday = startOfWeek(new Date());
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  function bookingsOnDay(d: Date) {
    return BOOKINGS.filter(
      (b) => {
        const bd = new Date(b.slotTime);
        return (
          bd.getFullYear() === d.getFullYear() &&
          bd.getMonth() === d.getMonth() &&
          bd.getDate() === d.getDate()
        );
      },
    ).sort((a, b) => new Date(a.slotTime).getTime() - new Date(b.slotTime).getTime());
  }

  return (
    <>
      <AdminPageHeader
        title="Calendar"
        description="Week-at-a-glance view of bookings across both venues."
        action={
          <Link
            href="/admin/bookings"
            className="rounded-full border border-cream/15 px-5 py-2 text-xs font-bold uppercase tracking-wider text-cream/85 hover:bg-cream/5"
          >
            Table view
          </Link>
        }
      />
      <PreviewBanner />

      <div className="mb-4 flex items-center justify-between">
        <button className="rounded-full border border-cream/15 px-4 py-1.5 text-xs hover:bg-cream/5">
          ← Previous week
        </button>
        <p className="font-display text-lg">
          Week of {monday.toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
        </p>
        <button className="rounded-full border border-cream/15 px-4 py-1.5 text-xs hover:bg-cream/5">
          Next week →
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-7">
        {days.map((d) => {
          const items = bookingsOnDay(d);
          const total = items.reduce((s, b) => s + (b.status === "confirmed" ? b.totalPence : 0), 0);
          const isToday =
            d.toDateString() === new Date().toDateString();
          return (
            <AdminCard key={d.toISOString()}>
              <div
                className={`border-b border-cream/10 px-4 py-3 ${
                  isToday ? "bg-plonkPink/10" : ""
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
                  {d.toLocaleDateString("en-GB", { weekday: "short" })}
                </p>
                <p className="font-display text-xl">
                  {d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </p>
                <p className="mt-0.5 text-xs text-cream/55">
                  {items.length} booking{items.length === 1 ? "" : "s"} · {fmtMoney(total)}
                </p>
              </div>
              <ul className="divide-y divide-cream/5">
                {items.length === 0 ? (
                  <li className="px-4 py-4 text-center text-xs text-cream/40">— empty —</li>
                ) : (
                  items.map((b) => (
                    <li key={b.id} className="px-4 py-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-cream/85">{fmtTime(b.slotTime)}</span>
                        <span
                          className={`text-[10px] uppercase tracking-widest ${
                            b.venueId === "hackney" ? "text-plonkPink" : "text-plonkTeal"
                          }`}
                        >
                          {b.venueId === "hackney" ? "HKY" : "BOR"}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-cream/85">{b.customerName}</p>
                      <p className="text-[11px] text-cream/55">
                        {b.partySize} ppl · {fmtMoney(b.totalPence)}
                      </p>
                    </li>
                  ))
                )}
              </ul>
            </AdminCard>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-cream/55">
        <span><span className="text-plonkPink">●</span> Hackney</span>
        <span><span className="text-plonkTeal">●</span> Borough Market</span>
      </div>
    </>
  );
}
