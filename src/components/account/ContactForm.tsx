'use client';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Dropdown } from "../ui/Dropdown";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country, UserAddress } from "@/interfaces";
import { useState } from "react";
import { Spinner } from "../ui/Spinner";
import { setUserAddress } from "@/actions";
import { useSession } from "next-auth/react";


interface ContactInputs {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: { id: string, name: string };
  postalCode: string
  phone: string;
}

const schema: ZodType<ContactInputs> = z.object({
  firstName: z.string().min(1, "Campo requerido"),
  lastName: z.string().min(1, "Campo requerido"),
  address: z.string().min(1, "Campo requerido"),
  city: z.string().min(1, "Campo requerido"),
  country: z.object({
    name: z.string().min(1),
    id: z.string().min(1, "Escoge un pais")
  }),
  postalCode: z.string().min(1, "Campo requerido"),
  phone: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, "Ingresa un numero valido"),
})

interface Props {
  addressInfo: UserAddress | null;
  countries: Country[]
}

export const ContactForm = ({ addressInfo, countries }: Props) => {

  const { data: session } = useSession({ required: true });
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, register, formState: { errors } } = useForm<ContactInputs>({
    defaultValues: {
      firstName: addressInfo?.firstName ?? "",
      lastName: addressInfo?.lastName ?? "",
      address: addressInfo?.address ?? "",
      city: addressInfo?.city ?? "",
      phone: addressInfo?.phone ?? "",
      postalCode: addressInfo?.postalCode ?? "",
    },
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
    setIsLoading(true);
    console.log({ data })

    await setUserAddress(data, session!.user.id)

    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <div className="w-full ">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Nombres
            </label>
            <input
              type="text"
              className={`border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.firstName && 'border-[1.5px] border-red-500'}`}
              {...register("firstName")}
            />
            {errors.firstName?.message && <span className="text-red-500 text-sm md:text-base">*{errors.firstName.message}</span>}
          </div>
        </div>
        <div className="w-full ">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Apellidos
            </label>
            <input
              type="text"
              className={`border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.lastName && 'border-[1.5px] border-red-500'}`}
              {...register("lastName")}
            />
            {errors.lastName?.message && <span className="text-red-500 text-sm md:text-base">*{errors.lastName.message}</span>}
          </div>
        </div>
        <div className="w-full md:col-span-2 ">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Direccion
            </label>
            <input
              type="text"
              className={`border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.address && 'border-[1.5px] border-red-500'}`}
              {...register("address")}
            />
            {errors.address?.message && <span className="text-red-500 text-sm md:text-base">*{errors.address.message}</span>}
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Ciudad
            </label>
            <input
              type="text"
              className={`border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.city && 'border-[1.5px] border-red-500'}`}
              {...register("city")}
            />
            {errors.city?.message && <span className="text-red-500 text-sm md:text-base">*{errors.city.message}</span>}
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Pais
            </label>
            <Controller
              name="country"
              defaultValue={{ id: addressInfo?.country.id ?? "", name: addressInfo?.country.name ?? "Seleccione un pais" }}
              control={control}
              render={({ field }) => (
                <Dropdown
                  className={errors?.country?.id ? 'border-[1.5px] border-red-500' : ''}
                  onChange={field.onChange}
                  options={countries}
                  value={field.value}
                />
              )}
            />
            {errors.country?.id?.message && <span className="text-red-500 text-sm md:text-base">*{errors.country.id.message}</span>}
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Codigo postal
            </label>
            <input
              type="text"
              className={`border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.postalCode && 'border-[1.5px] border-red-500'}`}
              {...register("postalCode")}
            />
            {errors.postalCode?.message && <span className="text-red-500 text-sm md:text-base">*{errors.postalCode.message}</span>}
          </div>
        </div>
        <div className="w-full">
          <div className="relative w-full mb-3">
            <label className="block text-xs md:text-base font-bold mb-2">
              Telefono
            </label>
            <input
              type="text"
              className={`border-0 px-3 py-3 bg-white rounded text-sm md:text-base shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.phone && 'border-[1.5px] border-red-500'}`}
              {...register("phone")}
            />
            {errors.phone?.message && <span className="text-red-500 text-sm md:text-base">*{errors.phone.message}</span>}
          </div>
        </div>
      </div>
    </form>
  )
}
