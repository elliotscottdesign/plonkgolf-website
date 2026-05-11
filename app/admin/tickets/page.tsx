import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { TICKETS, VENUES, fmtMoney, type TicketKind } from "@/lib/mockData";

export default function TicketsPage() {
  return (
    <>
      <AdminPageHeader
        title="Tickets & Prices"
        description="The ticket types customers can buy at checkout. Prices include VAT."
        action={
          <button className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
            + Add ticket
          </button>
        }
      />
      <PreviewBanner />

      <div className="space-y-6">
        {VENUES.map((venue) => {
          const items = TICKETS.filter((t) => t.venueId === venue.id);
          return (
            <AdminCard key={venue.id} title={venue.name}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cream/10 text-left text-xs uppercase tracking-widest text-cream/50">
                      <th className="px-5 py-3 font-bold">Name</th>
                      <th className="px-5 py-3 font-bold">Kind</th>
                      <th className="px-5 py-3 font-bold">Price inc. VAT</th>
                      <th className="px-5 py-3 font-bold">VAT</th>
                      <th className="px-5 py-3 font-bold">Active</th>
                      <th className="px-5 py-3 text-right font-bold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((t) => (
                      <tr key={t.id} className="border-b border-cream/5 last:border-b-0">
                        <td className="px-5 py-3">{t.name}</td>
                        <td className="px-5 py-3">
                          <KindBadge kind={t.kind} />
                        </td>
                        <td className="px-5 py-3 font-medium">{fmtMoney(t.pricePence)}</td>
                        <td className="px-5 py-3 text-cream/65">{t.vatRatePct}%</td>
                        <td className="px-5 py-3">
                          <Toggle on={t.active} />
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
                    ))}
                  </tbody>
                </table>
              </div>
            </AdminCard>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-cream/50">
        <strong>Kind</strong> drives booking rules — child tickets can't be
        bought without at least one adult ticket in the same basket. Changing
        a price here updates the public booking page within ~10 seconds once
        the database is wired in.
      </p>
    </>
  );
}

function KindBadge({ kind }: { kind: TicketKind }) {
  const styles: Record<TicketKind, string> = {
    adult: "bg-plonkPink/15 text-plonkPink",
    child: "bg-plonkYellow/15 text-plonkYellow",
    bundle: "bg-plonkTeal/15 text-plonkTeal",
    other: "bg-cream/10 text-cream/70",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${styles[kind]}`}
    >
      {kind}
    </span>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-flex h-5 w-9 items-center rounded-full transition ${
        on ? "bg-plonkTeal/80" : "bg-cream/15"
      }`}
    >
      <span
        className={`h-4 w-4 transform rounded-full bg-white transition ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </span>
  );
}
