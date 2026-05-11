import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { OPENING_HOURS, VENUES, DAY_LABELS } from "@/lib/mockData";

export default function HoursPage() {
  return (
    <>
      <AdminPageHeader
        title="Opening Hours"
        description="Per venue, per day of week. The booking page only shows slots within these hours."
      />
      <PreviewBanner />

      <div className="grid gap-6 lg:grid-cols-2">
        {VENUES.map((venue) => (
          <AdminCard
            key={venue.id}
            title={venue.name}
            action={
              <button className="text-xs font-semibold uppercase tracking-wider text-plonkYellow hover:underline">
                Edit
              </button>
            }
          >
            <table className="w-full text-sm">
              <tbody>
                {OPENING_HOURS.filter((h) => h.venueId === venue.id)
                  .sort((a, b) => ((a.day + 6) % 7) - ((b.day + 6) % 7))
                  .map((h) => (
                    <tr key={h.day} className="border-b border-cream/5 last:border-b-0">
                      <td className="px-5 py-2.5 text-xs uppercase tracking-widest text-cream/55">
                        {DAY_LABELS[h.day]}
                      </td>
                      <td className="px-5 py-2.5 font-medium">
                        {h.closed ? (
                          <span className="text-cream/40">Closed</span>
                        ) : (
                          `${h.openTime} – ${h.closeTime}`
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </AdminCard>
        ))}
      </div>

      <p className="mt-8 text-xs text-cream/50">
        Holidays and one-off closures are handled separately on the{" "}
        <a href="/admin/closed" className="underline">Closed Dates</a> page.
      </p>
    </>
  );
}
