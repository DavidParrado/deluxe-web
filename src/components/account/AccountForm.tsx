'use client'

import { setAccountInfo } from "@/actions";
import { User } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { Spinner } from "..";

type FormInputs = {
  firstName: string;
  lastName: string;
}

interface Props {
  accountInfo: User;
  children?: React.ReactNode;
}

const schemaValidator: ZodType<FormInputs> = z.object({
  firstName: z.string().min(1, "No debe estar vacio").trim().min(1, "No puede tener solo espacios"),
  lastName: z.string().min(1, "No debe estar vacio").trim().min(1, "No puede tener solo espacios"),
})

export const AccountForm = ({ accountInfo, children }: Props) => {

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
    defaultValues: {
      firstName: accountInfo.firstName,
      lastName: accountInfo.lastName,
    },
    resolver: zodResolver(schemaValidator)
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true)
    setErrorMessage('')

    const resp = await setAccountInfo(accountInfo.id, data)
    if (!resp.ok) {
      setIsLoading(false);
      setErrorMessage(resp.message);
      reset();
      return;
    };

    setIsLoading(false)
  }

  if (isLoading) return (
    <div className="h-56 lg:h-48 w-full flex justify-center items-center">
      <Spinner />
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
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
              defaultValue={accountInfo.email}
              className="cursor-not-allowed text-gray-400 border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
              {...register('firstName')}
            />
            {errors.firstName?.message && <span className="text-red-500 text-sm md:text-base">*{errors.firstName.message}</span>}
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
              {...register('lastName')}
            />
            {errors.lastName?.message && <span className="text-red-500 text-sm md:text-base">*{errors.lastName.message}</span>}
          </div>
        </div>
      </div>
      {
        errorMessage && <span className="text-red-500">*{errorMessage}</span>
      }

    </form>
  )
}
