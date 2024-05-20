import { OrderSummary, ProductsInCart } from "@/components"
import Link from "next/link"

const cartItems = [
  { productName: 'Nike Air Max 2019', units: 2, price: 250, size: '30' },
  { productName: 'Nike Air Max 2019', units: 2, price: 250, size: '30' },
  { productName: 'Nike Air Max 2019', units: 2, price: 250, size: '30' },
]

export default function CartPage() {
  return (
    <div className="h-full">
      <h1 className="mb-10 text-center text-2xl font-bold">Carrito de compras</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {/* First product */}
          <ProductsInCart />
        </div>
        {/* <!-- Sub total --> */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">

          <p className="text-lg font-bold">Resumen de la orden</p>
          <hr className="my-4" />

          <OrderSummary />
          <div className="text-center mt-5 w-full rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700">
            <Link href="/checkout/address">
              Verificar orden
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}