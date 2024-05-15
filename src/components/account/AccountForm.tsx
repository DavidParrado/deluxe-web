'use client'

import { setAccountInfo } from "@/actions";
import { User } from "@/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const user = {
  firstName: 'Juan David',
  lastName: 'Grimaldo Parrado',
  email: 'juandparrado04@gmail.com',
}

type FormInputs = {
  firstName: string;
  lastName: string;
}

interface Props {
  accountInfo: User
}

export const AccountForm = ({ accountInfo }: Props) => {

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      firstName: accountInfo.firstName,
      lastName: accountInfo.lastName
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')

    const resp = await setAccountInfo(accountInfo.id, data)
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    };

    router.refresh();
    // window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-full text-center flex justify-between py-4">
        <h6 className="text-sm md:text-base font-bold uppercase">
          Informacion del usuario
        </h6>
        <button type="submit" className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
          Guardar
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">

        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Correo electronico
            </label>
            <input
              type="email"
              readOnly
              disabled
              className="cursor-not-allowed text-gray-400 border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={user.email}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Nombres
            </label>
            <input
              type="text"
              className={`border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.firstName && 'border-[1.5px] border-red-500'}`}
              {...register('firstName', { required: true })}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Apellidos
            </label>
            <input
              type="text"
              className={`border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.lastName && 'border-[1.5px] border-red-500'}`}
              {...register('lastName', { required: true })}
            />
          </div>
        </div>
      </div>

    </form>
  )
}
