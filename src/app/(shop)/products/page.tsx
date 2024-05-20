import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page: string;
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect('/')
  }
  return (
    <div className="mt-10 md:mt-0">
      <h1 className="font-bold">Todos los productos</h1>
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages} />
    </div>
  )
}