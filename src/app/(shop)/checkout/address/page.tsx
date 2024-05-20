import { AddressForm, ContactForm } from '@/components';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';
import Link from 'next/link';

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
        <AddressForm countries={countries} addressInfo={userAddress} />

      </div>
    </div>
  );
}