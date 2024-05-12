import { Categories, Footer, TopBar } from "@/components";

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopBar />
      <Categories />
      <div className="md:px-20 bg-gradient-to-bl from-blue-50 to-violet-50 py-10">
        {children}
      </div>
      <Footer />
    </main>
  );
}