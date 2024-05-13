import { Categories, Footer, TopBar } from "@/components";

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Categories className="hidden md:flex"/>
      <div className="w-full h-full px-5 md:px-10 xl:px-20 bg-gradient-to-bl from-blue-50 to-violet-50 py-10">
        {children}
      </div>
      <Footer />
    </main>
  );
}