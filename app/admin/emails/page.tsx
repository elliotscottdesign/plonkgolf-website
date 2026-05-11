import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminCard, PreviewBanner } from "@/components/admin/AdminCard";
import { EMAIL_TEMPLATES } from "@/lib/mockData";

export default function EmailsPage() {
  return (
    <>
      <AdminPageHeader
        title="Email Templates"
        description="Wording of the emails Plonk sends to customers. Tags like {{first_name}} or {{slot_time}} get filled in automatically."
      />
      <PreviewBanner />

      <div className="space-y-6">
        {EMAIL_TEMPLATES.map((t) => (
          <AdminCard
            key={t.id}
            title={t.label}
            action={
              <div className="flex gap-2">
                <button className="text-xs font-semibold uppercase tracking-wider text-plonkYellow hover:underline">
                  Preview
                </button>
                <button className="rounded-full bg-plonkPink px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  Save
                </button>
              </div>
            }
          >
            <div className="space-y-4 px-5 py-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-cream/50">
                  Subject line
                </label>
                <input
                  type="text"
                  defaultValue={t.subject}
                  className="mt-2 w-full rounded-lg border border-cream/15 bg-ink/40 px-4 py-2.5 text-sm text-cream focus:border-plonkPink focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-cream/50">
                  Body
                </label>
                <textarea
                  defaultValue={t.body}
                  rows={10}
                  className="mt-2 w-full rounded-lg border border-cream/15 bg-ink/40 px-4 py-3 font-mono text-xs leading-relaxed text-cream focus:border-plonkPink focus:outline-none"
                />
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <p className="mt-8 text-xs text-cream/50">
        Available tags depend on the email type — booking confirmations get{" "}
        <code className="text-cream/85">{"{{first_name}}"}</code>,{" "}
        <code className="text-cream/85">{"{{slot_time}}"}</code>,{" "}
        <code className="text-cream/85">{"{{venue_name}}"}</code>,{" "}
        <code className="text-cream/85">{"{{party_size}}"}</code>,{" "}
        <code className="text-cream/85">{"{{reference}}"}</code>.
      </p>
    </>
  );
}
