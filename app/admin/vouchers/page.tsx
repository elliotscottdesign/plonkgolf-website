import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { VOUCHERS, fmtMoney } from "@/lib/mockData";

export default function VouchersPage() {
  return (
    <>
      <AdminPageHeader
        title="Vouchers"
        description="Gift vouchers issued to customers — code, value, balance, expiry."
        action={
          <button className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
            + Issue voucher
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
                <th className="px-5 py-3 font-bold">Issued to</th>
                <th className="px-5 py-3 font-bold">Value</th>
                <th className="px-5 py-3 font-bold">Balance</th>
                <th className="px-5 py-3 font-bold">Expires</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 text-right font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {VOUCHERS.map((v) => (
                <tr key={v.id} className="border-b border-cream/5 last:border-b-0">
                  <td className="px-5 py-3 font-mono text-xs">{v.code}</td>
                  <td className="px-5 py-3 text-cream/85">{v.issuedTo || "—"}</td>
                  <td className="px-5 py-3 font-medium">{fmtMoney(v.valuePence)}</td>
                  <td className="px-5 py-3">{fmtMoney(v.balancePence)}</td>
                  <td className="px-5 py-3 text-cream/65">
                    {new Date(v.expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill status={v.status} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-xs font-semibold uppercase tracking-wider text-plonkYellow hover:underline">
                      View
                    </button>
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

function StatusPill({ status }: { status: "active" | "redeemed" | "expired" }) {
  const styles: Record<typeof status, string> = {
    active: "bg-plonkTeal/15 text-plonkTeal",
    redeemed: "bg-cream/10 text-cream/60",
    expired: "bg-red-400/15 text-red-300",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
}
