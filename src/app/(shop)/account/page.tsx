import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { AccountForm } from '../../../components/account/AccountForm';
import { ContactForm } from "@/components";
import { User } from "@/interfaces";
import { getCountries, getUserAddress, getUserInfo } from "@/actions";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect('/');
  }

  const countries = await getCountries();
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

            <AccountForm accountInfo={userInfo as User}>
              <div className="h-full text-center flex justify-between py-4">
                <h6 className="text-sm md:text-base font-bold uppercase">
                  Informacion del usuario
                </h6>
                <button type="submit" className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Guardar
                </button>
              </div>
            </AccountForm>
            <hr className="border-b-1" />
            <ContactForm addressInfo={addressInfo} countries={countries}>
              <div className="h-full text-center flex justify-between py-4">
                <h6 className="text-sm md:text-base font-bold uppercase">
                  Informacion de contacto
                </h6>
                <button type="submit" className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Guardar
                </button>
              </div>
            </ContactForm>
          </div>

        </div>
      </div>
    </section>
  )
}