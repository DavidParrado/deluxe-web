import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { AccountForm } from '../../../components/account/AccountForm';
import { ContactForm } from "@/components";
import { User } from "@/interfaces";
import { getUserAddress, getUserInfo } from "@/actions";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect('/');
  }

  const userInfo = await getUserInfo(session.user.id) ?? session.user;
  const addressInfo = await getUserAddress(session.user.id);

  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-full lg:max-w-[50rem]">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t bg-white border-b border-gray-200 mb-0 px-6 py-6">
            <h6 className="text-xl md:text-2xl font-bold">
              Mi cuenta
            </h6>
          </div>

          <div className="flex-auto px-6 pb-4 pt-0">
            <AccountForm accountInfo={userInfo as User}/>
            <hr className="border-b-1" />
            <ContactForm addressInfo={addressInfo}/>
          </div>

        </div>
      </div>
    </section>
  )
}