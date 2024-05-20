import { getOrderById } from "@/actions"
import { AddressSummary, NotPaidButton, OrderSummary, PaidButton, ProductImage } from "@/components"
import { OrderStatus } from "@/components/orders/OrderStatus"
import { currencyFormat } from "@/utils"
import Image from "next/image"
import { redirect } from "next/navigation"

interface Props {
  params: {
    id: string;
  }
}

export default async function OrderPage({ params }: Props) {

  const { id } = params;

  // Todo: Llamar el server action
  const { ok, order } = await getOrderById(id);
  if (!ok) {
    redirect('/')
  }

  const address = order!.OrderAddress;

  // Todo: verificar
  // redirect(/)


  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col md:flex-row w-full lg:max-w-[90%] xl:max-w-[80%] gap-x-[5%] lg:gap-x-[10%]">


        <div className="w-full flex flex-col gap-4">

          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">{`Orden #${order!.id.split('-').at(-1)}`}</h1>
          {/* Carrito */}
          <div className="w-full flex flex-col">

            <OrderStatus isPaid={order!.isPaid} />

            <br />
            {/* Items */}
            {
              order!.OrderItem.map(item => (

                <div key={item.product.slug + '-' + item.size} className="w-full flex mb-5">
                  <div className="max-w-36 md:max-w-48">
                    <ProductImage
                      src={`${item.product.ProductImage[0].url}`}
                      width={600}
                      height={600}
                      alt={item.product.title}
                      className="rounded"
                    />
                  </div>

                  <div className="w-full flex flex-col justify-center px-5">
                    <p>{item.product.title}</p>
                    <p>${item.price} x {item.quantity}</p>
                    <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>

                </div>
              ))
            }
          </div>

        </div>

        {/* Checkout - Resumen de orden */}
        <div className="h-fit rounded-lg border bg-white p-6 shadow-md md:mt-0 w-full max-w-[50rem]">
          <AddressSummary />
          <hr className="my-4" />
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">No. Productos</p>
            <p className="text-gray-700">{order!.itemsInOrder === 1 ? '1 articulo' : `${order!.itemsInOrder} articulos`}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{currencyFormat(order!.subTotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Impuestos(19)%</p>
            <p className="text-gray-700">{currencyFormat(order!.tax)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <p className="mb-1 text-lg font-bold">{currencyFormat(order!.total)}</p>
          </div>

          <button className="mt-6 w-full rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700">Pagar</button>
          <button className="mt-6 w-full rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700">Pagar con tarjeta de credito</button>

        </div>

      </div>
    </div>
  )
}