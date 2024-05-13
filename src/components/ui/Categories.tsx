import Link from "next/link"

const categories = [
  'camisetas',
  'pantalones',
  'hombres',
  'mujeres',
  'niños',
]

interface Props {
  className?: React.StyleHTMLAttributes<HTMLDivElement>['className'];
}

export const Categories = ({ className }: Props ) => {
  return (
    <div className={`flex justify-between text-black mt-24 mb-6 px-5 md:px-10 xl:px-20 ${className}`}>
      {
        categories.map((category, i) => (
          <Link href={`/category/${category}`} key={category + i} className="capitalize hover:underline cursor-pointer">{category}</Link>
        ))
      }
    </div>
  )
}
