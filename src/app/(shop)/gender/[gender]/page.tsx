import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { Gender } from "@/interfaces";
import { Category } from "@/seed/seed";
import { isValidGender } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  }
  searchParams: {
    page: string;
  }
}

export default async function ProductsByGenderPage({ searchParams, params }: Props) {
  const { gender } = params;
  if (!isValidGender(gender)) redirect('/products')
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  console.log(params.gender)
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect('/')
  }

  const labels: Record<Category, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
  }

  return (
    <div className="mt-10 md:mt-0">
      <h1 className="font-bold">Productos para {labels[gender as Gender]}</h1>
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  )
}