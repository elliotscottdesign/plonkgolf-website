import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { CLOSED_DATES, VENUES } from "@/lib/mockData";

export default function ClosedDatesPage() {
  const sorted = [...CLOSED_DATES].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <AdminPageHeader
        title="Closed Dates"
        description="Days a venue is closed entirely (private hire, holidays, maintenance). These disappear from the public booking page."
        action={
          <button className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
            + Block a date
          </button>
        }
      />
      <PreviewBanner />

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                <th className="px-5 py-3 font-bold">Date</th>
                <th className="px-5 py-3 font-bold">Venue</th>
                <th className="px-5 py-3 font-bold">Reason</th>
                <th className="px-5 py-3 text-right font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => {
                const where =
                  c.venueId === "all"
                    ? "Both venues"
                    : VENUES.find((v) => v.id === c.venueId)?.name || "—";
                const d = new Date(c.date + "T00:00:00");
                return (
                  <tr key={c.id} className="border-b border-cream/5 last:border-b-0">
                    <td className="px-5 py-3 font-medium">
                      {d.toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3 text-cream/65">{where}</td>
                    <td className="px-5 py-3 text-cream/80">{c.reason}</td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs font-semibold uppercase tracking-wider text-red-400/80 hover:underline">
                        Remove block
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </>
  );
}
