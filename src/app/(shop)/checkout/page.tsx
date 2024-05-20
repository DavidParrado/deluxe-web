import { PlaceOrder, ProductsInOrder } from "@/components"

export default function CheckoutPage() {
  return (
    <div className="flex flex-col w-full lg:px-20 xl:px-40">

      <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">Verificar orden</h1>

      <div className="w-full flex flex-col md:flex-row mt-5 justify-between gap-x-[10%]">

        {/* Carrito */}
        <div className="w-full flex flex-col md:max-w-[50%]">
          <ProductsInOrder />
        </div>

        {/* Checkout - Resumen de orden */}
        <PlaceOrder />

      </div>

    </div>
  )
}