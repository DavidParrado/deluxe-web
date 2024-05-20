'use client';

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { AddressSummary } from "../address/AddressSummary";


export const PlaceOrder = () => {

  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const address = useAddressStore(state => state.address);

  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))


    console.log({ address, productsToOrder });

    // Server action
    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message)
      return;
    }

    //* Todo salio bien!
    clearCart();
    router.replace('/orders/' + resp.order?.id)

  }

  if (!loaded) {
    return (<p>Loading...</p>);
  }

  return (
    <div className="h-fit rounded-lg border bg-white p-6 shadow-md md:mt-0 w-full max-w-[50rem]">
      <AddressSummary />
      <hr className="my-4" />
      <OrderSummary />
      <p className="mb-5">
        {/* Disclaimer */}
        <span className="text-xs">
          Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">terminos y condiciones</a> y <a href="#" className="underline">politica de privacidad</a>
        </span>
      </p>

      <p className="text-red-500">{errorMessage}</p>

      <button
        disabled={isPlacingOrder}
        onClick={onPlaceOrder}
        className={`w-full rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700 ${isPlacingOrder ? "bg-slate-600" : ""}`}
      >
        Generar orden
      </button>

    </div>
  )
}
