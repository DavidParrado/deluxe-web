import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href={'/'} className="flex items-center justify-between gap-2 pr-2 min-w-max">
      <Image
        src={"/imgs/Logo_NIKE.png"}
        alt=""
        width={40}
        height={40}
      />
      <h1 className="w-full font-bold md:text-xl">DELUXE</h1>
    </Link>
  )
}
