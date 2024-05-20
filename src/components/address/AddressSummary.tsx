'use client';
import { useAddressStore } from "@/store";

export const AddressSummary = () => {

  const address = useAddressStore(state => state.address);

  return (
    <div className="flex flex-col justify-between gap-2">
      <p className="text-lg font-bold">Direccion de entrega</p>
      <p className="text-gray-700">{`${address.firstName} ${address.lastName}`}</p>
      <p className="text-gray-700">{address.address}</p>
      <p className="text-gray-700">{address.postalCode}</p>
      <p className="text-gray-700">{`${address.city}, ${address.country.name}`}</p>
      <p className="text-gray-700">{address.phone}</p>
    </div>
  )
}
