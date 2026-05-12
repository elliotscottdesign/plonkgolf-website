import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContentProvider } from "@/lib/content";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </ContentProvider>
  );
}
