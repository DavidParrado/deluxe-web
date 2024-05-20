import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { Gender } from "@/interfaces";
import { isValidCategory, isValidGender } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
  params: {
    category: string;
  }
  searchParams: {
    page: string;
  }
}

export default async function ProductsByGenderPage({ searchParams, params }: Props) {
  const { category } = params;
  if (!isValidCategory(category)) redirect('/products')
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, category: category });

  return (
    <div className="mt-10 md:mt-0">
      <h1 className="text-xl font-bold capitalize">{category}</h1>
      <ProductGrid products={products} />
      {
        products.length > 0 && (<Pagination totalPages={totalPages} />)
      }
      {
        products.length === 0 && <span>Lo sentimos aun no tenemos {category} disponibles</span>
      }
    </div>
  )
}