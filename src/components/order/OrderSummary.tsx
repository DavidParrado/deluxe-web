'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {

  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true);
  }, []);


  if (!loaded) return (<p>Loading...</p>)

  return (
    <>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">No. Productos</p>
        <p className="text-gray-700">{itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}</p>
      </div>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">{currencyFormat(subTotal)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Impuestos(19)%</p>
        <p className="text-gray-700">{currencyFormat(tax)}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <p className="mb-1 text-lg font-bold">{currencyFormat(total)}</p>
      </div>
    </>
  )
}
