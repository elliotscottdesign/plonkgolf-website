import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { PROMOS, fmtMoney } from "@/lib/mockData";

export default function PromosPage() {
  return (
    <>
      <AdminPageHeader
        title="Promo Codes"
        description="Discount codes customers can enter at checkout. Set the value, dates, and usage limit."
        action={
          <button className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
            + New code
          </button>
        }
      />
      <PreviewBanner />

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                <th className="px-5 py-3 font-bold">Code</th>
                <th className="px-5 py-3 font-bold">Discount</th>
                <th className="px-5 py-3 font-bold">Valid</th>
                <th className="px-5 py-3 font-bold">Uses</th>
                <th className="px-5 py-3 font-bold">Active</th>
                <th className="px-5 py-3 text-right font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {PROMOS.map((p) => {
                const discount =
                  p.kind === "percent" ? `${p.value}% off` : `${fmtMoney(p.value)} off`;
                const validFrom = new Date(p.validFrom).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
                const validTo = new Date(p.validTo).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
                return (
                  <tr key={p.id} className="border-b border-cream/5 last:border-b-0">
                    <td className="px-5 py-3 font-mono text-xs">{p.code}</td>
                    <td className="px-5 py-3 font-medium">{discount}</td>
                    <td className="px-5 py-3 text-cream/65 text-xs">{validFrom} → {validTo}</td>
                    <td className="px-5 py-3">
                      {p.uses}
                      {p.maxUses ? <span className="text-cream/50"> / {p.maxUses}</span> : ""}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex h-5 w-9 items-center rounded-full ${
                          p.active ? "bg-plonkTeal/80" : "bg-cream/15"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 transform rounded-full bg-white transition ${
                            p.active ? "translate-x-4" : "translate-x-0.5"
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
