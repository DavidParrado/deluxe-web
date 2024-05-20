import { ContactForm } from '@/components';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';

export default async function AddressPage() {

  const countries = await getCountries();

  const session = await auth();

  if (!session?.user.id) {
    return (
      <h3 className='text-5xl'>500 - No hay sesion de usuario</h3>
    )
  }

  const userAddress = await getUserAddress(session.user.id) ?? null;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <div className="h-full text-center flex justify-between py-4">
          <h6 className="text-sm md:text-base font-bold uppercase">
            Direccion de entrega
          </h6>
          <button type="submit" className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
            Continuar
          </button>
        </div>
        <ContactForm countries={countries} addressInfo={userAddress} />

      </div>
    </div>
  );
}