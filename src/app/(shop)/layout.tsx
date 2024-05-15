import { Categories, Footer, TopBar } from "@/components";
import { Sidebar } from "@/components/ui/Sidebar";

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full">
      <TopBar />
      <Sidebar className="hidden lg:block" />
      <Categories className="md:flex"/>
      <div className="w-full h-full px-5 md:px-10 xl:px-20 bg-gradient-to-bl from-blue-50 to-violet-50 py-10 min-h-[calc(100vh-491px-56px)] md:min-h-[calc(100vh-455px-144px)] lg:min-h-[calc(100vh-321px-72px)]">
        {children}
      </div>
      <Footer />
    </main>
  );
}