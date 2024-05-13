// import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {

  // const session = await auth();
  // if (session?.user) {
  //   redirect('/');
  // }

  return (
    // todo: review h-size
    <main className="min-h-screen bg-blue-50 flex justify-center items-center">
      <div className="w-full p-10 lg:p-0">
        {children}
      </div>
    </main>
  );
}