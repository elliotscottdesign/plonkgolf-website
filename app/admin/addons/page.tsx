import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { ADDONS, VENUES, fmtMoney } from "@/lib/mockData";

export default function AddonsPage() {
  return (
    <>
      <AdminPageHeader
        title="Add-ons"
        description="Extras customers can add to their basket after picking a slot — food, drink, merch."
        action={
          <button className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
            + Add product
          </button>
        }
      />
      <PreviewBanner />

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                <th className="px-5 py-3 font-bold">Product</th>
                <th className="px-5 py-3 font-bold">Available at</th>
                <th className="px-5 py-3 font-bold">Price inc. VAT</th>
                <th className="px-5 py-3 font-bold">Active</th>
                <th className="px-5 py-3 text-right font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {ADDONS.map((a) => {
                const where =
                  a.venueId === "all"
                    ? "Both venues"
                    : VENUES.find((v) => v.id === a.venueId)?.name || "—";
                return (
                  <tr key={a.id} className="border-b border-cream/5 last:border-b-0">
                    <td className="px-5 py-3">
                      <p className="font-medium">{a.name}</p>
                      {a.description && (
                        <p className="mt-1 max-w-md text-xs text-cream/55">
                          {a.description}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-cream/65">{where}</td>
                    <td className="px-5 py-3 font-medium">{fmtMoney(a.pricePence)}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex h-5 w-9 items-center rounded-full ${
                          a.active ? "bg-plonkTeal/80" : "bg-cream/15"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 transform rounded-full bg-white transition ${
                            a.active ? "translate-x-4" : "translate-x-0.5"
                          }`}
                        />
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="mr-2 text-xs font-semibold uppercase tracking-wider text-plonkYellow hover:underline">
                        Edit
                      </button>
                      <button className="text-xs font-semibold uppercase tracking-wider text-red-400/80 hover:underline">
                        Delete
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
