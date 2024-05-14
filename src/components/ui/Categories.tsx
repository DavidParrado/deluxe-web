'use client';

import Link from "next/link"
import { usePathname } from "next/navigation";

const categories = [
  { name: 'camisetas', path: "/category/camisetas" },
  { name: 'pantalones', path: "/category/pantalones" },
  { name: 'zapatos', path: "/category/zapatos" },
  { name: 'hombres', path: "/gender/hombres" },
  { name: 'mujeres', path: "/gender/mujeres" },
  { name: 'niños', path: "/gender/niños" },
]

interface Props {
  className?: React.StyleHTMLAttributes<HTMLDivElement>['className'];
}

export const Categories = ({ className }: Props) => {

  const pathname = usePathname();
  if (pathname.startsWith('/account') || pathname.startsWith('/cart') || pathname.startsWith('/orders')) {
    return <div className="mt-14 md:mt-[72px]"></div>
  }

  return (
    <div className={`flex justify-between text-black mt-14 py-4 md:py-6 md:mt-[72px] px-5 md:px-10 xl:px-20 ${className}`}>
      {
        categories.map((category, i) => (
          <Link href={category.path} key={category.name + i} className={`${i + 1 > 3 ? 'hidden' : ''} md:flex capitalize hover:underline cursor-pointer`}>{category.name}</Link>
        ))
      }
    </div>
  )
}
