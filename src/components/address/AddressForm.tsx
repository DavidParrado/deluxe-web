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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useAddressStore } from "@/store";


interface ContactInputs {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: { id: string, name: string };
  postalCode: string
  phone: string;
  rememberAddress: boolean;
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
  rememberAddress: z.boolean()
})

interface Props {
  addressInfo: UserAddress | null;
  countries: Country[];
  children?: React.ReactNode;
}

export const AddressForm = ({ addressInfo, countries, children }: Props) => {

  const router = useRouter();
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
      rememberAddress: false
    },
    resolver: zodResolver(schema)
  });

  const setAddress = useAddressStore(state => state.setAdress);
  // const address = useAddressStore(state => state.address);

  const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
    setIsLoading(true);

    const { rememberAddress, ...restAddress } = data;
    if(rememberAddress) {
      console.log('Heyy')
      await setUserAddress(data, session!.user.id)
    }
    setAddress(restAddress);
    

    setIsLoading(false);
    router.push('/checkout')
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
      <div className="h-full text-center flex justify-between py-4">
        <h6 className="text-sm md:text-base font-bold uppercase">
          Direccion de entrega
        </h6>
        <button type="submit" className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
          Continuar
        </button>
      </div>
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
        <div className="flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
            data-ripple-dark="true"
          >
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
            {...register("rememberAddress")}
            // checked
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <FontAwesomeIcon icon={faCheck} className="text-white" />
            </div>
          </label>

          <span>¿Recordar direccion?</span>

        </div>

      </div>
    </form>
  )
}
