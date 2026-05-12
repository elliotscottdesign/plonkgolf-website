import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ContentEditor from "@/components/admin/ContentEditor";

export const metadata = { title: "FAQs content — Plonk Admin" };

export default function FaqsContentPage() {
  return (
    <>
      <AdminPageHeader
        title="FAQs"
        description="Edit the title + intro on /faqs. (Individual Q&As are managed separately — message the dev if you need to add or remove one.)"
        action={
          <a
            href="/faqs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cream/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream/85 hover:bg-cream/5"
          >
            View page ↗
          </a>
        }
      />
      <ContentEditor page="info.faqs" />
    </>
  );
}
