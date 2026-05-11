import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { SLOT_OVERRIDES, VENUES } from "@/lib/mockData";

export default function SlotsPage() {
  const sorted = [...SLOT_OVERRIDES].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <AdminPageHeader
        title="Slot Capacity"
        description="Default is 6 tickets every 10 minutes per venue. Override that here for specific dates / hours — busier days, maintenance windows, etc."
        action={
          <button className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
            + Add override
          </button>
        }
      />
      <PreviewBanner />

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Setting label="Default capacity per slot" value="6 tickets" />
        <Setting label="Slot length" value="10 minutes" />
      </div>

      <AdminCard title="Overrides">
        {sorted.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-cream/55">
            No overrides yet — every slot uses the default 6 tickets.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                  <th className="px-5 py-3 font-bold">Date</th>
                  <th className="px-5 py-3 font-bold">Venue</th>
                  <th className="px-5 py-3 font-bold">Window</th>
                  <th className="px-5 py-3 font-bold">Capacity</th>
                  <th className="px-5 py-3 font-bold">Reason</th>
                  <th className="px-5 py-3 text-right font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s) => {
                  const venueName = VENUES.find((v) => v.id === s.venueId)?.name || "—";
                  const d = new Date(s.date + "T00:00:00");
                  return (
                    <tr key={s.id} className="border-b border-cream/5 last:border-b-0">
                      <td className="px-5 py-3 font-medium">
                        {d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                      </td>
                      <td className="px-5 py-3 text-cream/65">{venueName}</td>
                      <td className="px-5 py-3 text-cream/80">{s.startTime} – {s.endTime}</td>
                      <td className="px-5 py-3 font-medium">{s.capacity} / 10 min</td>
                      <td className="px-5 py-3 text-cream/65">{s.reason}</td>
                      <td className="px-5 py-3 text-right">
                        <button className="mr-2 text-xs font-semibold uppercase tracking-wider text-plonkYellow hover:underline">
                          Edit
                        </button>
                        <button className="text-xs font-semibold uppercase tracking-wider text-red-400/80 hover:underline">
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-cream/10 bg-ink/40 px-5 py-4">
      <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </div>
  );
}
