import Link from "next/link"

const categories = [
  'camisetas',
  'pantalones',
  'hombres',
  'mujeres',
  'niños',
]

export const Categories = () => {
  return (
    <div className="flex justify-between text-black mt-24 mb-6 px-20">
      {
        categories.map((category, i) => (
          <Link href={`/category/${category}`} key={category + i} className="capitalize hover:underline cursor-pointer">{category}</Link>
        ))
      }
    </div>
  )
}
