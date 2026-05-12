import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ContentEditor from "@/components/admin/ContentEditor";

export const metadata = { title: "Snack Bar content — Plonk Admin" };

export default function SnackBarContentPage() {
  return (
    <>
      <AdminPageHeader
        title="Snack Bar"
        description="Edit the copy on /snack-bar."
        action={
          <a
            href="/snack-bar"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cream/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream/85 hover:bg-cream/5"
          >
            View page ↗
          </a>
        }
      />
      <ContentEditor page="info.snackbar" />
    </>
  );
}
