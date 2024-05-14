import { NotPaidButton, PaidButton } from "@/components"
import { OrderStatus } from "@/components/orders/OrderStatus"
import { currencyFormat } from "@/utils"
import Image from "next/image"

const order = {
  id: '809c9013-9c87-4b9a-a482-ff848d372cad',
  OrderItem: [
    {
      size: '32US',
      price: 200,
      quantity: 2,
      product: {
        title: 'Ervan M Wiravan',
        slug: 'whatever',
        ProductImage: [{ url: 'ervan-m-wirawan-tgdgb6yb0Qo-unsplash.png' }]
      }
    },
    {
      size: '32US',
      price: 200,
      quantity: 2,
      product: {
        title: 'Ervan M Wiravan',
        slug: 'whatever',
        ProductImage: [{ url: 'ervan-m-wirawan-tgdgb6yb0Qo-unsplash.png' }]
      }
    },
    {
      size: '32US',
      price: 200,
      quantity: 2,
      product: {
        title: 'Ervan M Wiravan',
        slug: 'whatever',
        ProductImage: [{ url: 'ervan-m-wirawan-tgdgb6yb0Qo-unsplash.png' }]
      }
    },
  ],
  itemsInOrder: 1,
  subTotal: 200,
  total: 238,
  tax: 38,
  isPaid: true
}

const address = {
  firstName: 'Juan',
  lastName: 'Grimaldo',
  address: 'Calle 25M #20d-20',
  address2: '',
  postalCode: '500001',
  city: 'Villavicencio',
  country: { name: 'Colombia', },
  phone: '3223864759'
}

export default function OrderPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-full lg:max-w-[90%] xl:max-w-[80%]">

        <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">{`Orden #${order.id.split('-').at(-1)}`}</h1>


        <div className="w-full flex flex-col md:flex-row mt-5 justify-between gap-x-[5%] lg:gap-x-[10%]">

          {/* Carrito */}
          <div className="w-full flex flex-col md:max-w-[50%]">

            <OrderStatus isPaid={order.isPaid} />

            <br />
            {/* Items */}
            {
              order!.OrderItem.map(item => (

                <div key={item.product.slug + '-' + item.size} className="w-full flex mb-5">
                  <div className="w-fit">
                    <Image
                      src={`/products/${item.product.ProductImage[0].url}`}
                      width={100}
                      height={100}
                      style={{
                        width: '100px',
                        height: '100px'
                      }}
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

          {/* Checkout - Resumen de orden */}
          <div className="h-fit rounded-lg border bg-white p-6 shadow-md md:mt-0 w-full max-w-[50rem]">
            <div className="flex flex-col justify-between gap-1 xl:gap-2">
              <p className="text-lg font-bold">Direccion de entrega</p>
              <p className="text-gray-700">Juan Grimaldo</p>
              <p className="text-gray-700">Calle 3</p>
              <p className="text-gray-700">500001</p>
              <p className="text-gray-700">Villavicencio, Colombia</p>
              <p className="text-gray-700">3223864759</p>
            </div>
            <hr className="my-4" />
            <div className="xl:mb-2 flex justify-between">
              <p className="text-gray-700">No. Productos</p>
              <p className="text-gray-700">2</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$130</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                <p className="text-sm text-gray-700">incluyendo impuestos</p>
              </div>
            </div>

            <button className="mt-6 w-full rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700">Pagar</button>
            <button className="mt-6 w-full rounded-md bg-slate-800 py-1.5 font-medium text-blue-50 hover:bg-slate-700">Pagar con tarjeta de credito</button>

          </div>

        </div>

      </div>
    </div>
  )
}