import { faBagShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

export const Landing = () => {
  return (
    <div className="flex items-center justify-between w-full h-full gap-72 mt-20 mb-32">
      {/* Title */}
      <div className="flex flex-col justify-center gap-6">
        <h1 className="uppercase text-4xl font-bold">Bienvenido a deluxe</h1>
        <p className="text-wrap">¡Bienvenido a Deluxe, tu destino único para estilo y sofisticación! Sumérgete en nuestra colección seleccionada de exquisitas joyas, pantalones de moda, elegantes camisas y cómodas sudaderas diseñadas para todos los géneros. ¡Comienza a explorar y eleva tu estilo con Deluxe hoy mismo!</p>
        <div className="w-fit bg-black text-white py-3 px-5 flex items-center gap-2 cursor-pointer mt-4 hover:bg-slate-800">
          <FontAwesomeIcon icon={faBagShopping} width={14} height={14} />
          <Link href={'/products'}>Comprar ahora</Link>
        </div>
      </div>
      {/* Image */}
      <Image
        src={"/imgs/toa-heftiba--abWByT3yg4-unsplash.jpg"}
        className="object-cover rounded-full"
        width={250}
        height={200}
        alt=""
      />
    </div>
  )
}
