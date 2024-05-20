// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithImages } from '@/actions';
import { NotPaidButton, Pagination, PaidButton, ProductImage } from '@/components';
import { currencyFormat } from '@/utils/currencyFormat';
import Image from 'next/image';

import Link from 'next/link';

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function ProductsPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  return (
    <>
      <h1 className="font-bold text-xl">Todos los productos - Administrador</h1>

      <div className="flex justify-end mb-5">
        <Link
          href="/admin/product/new"
          className='w-fit bg-black text-white rounded-sm py-3 px-5 flex items-center gap-2 cursor-pointer mt-4 hover:bg-slate-800 transition-colors duration-300'
        >
          Nuevo Producto
        </Link>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full overflow-x-auto ">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 md:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">

                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Imagen
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Titulo
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Precio
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Genero
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Inventario
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Tallas
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Opciones
                    </th>

                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    products.map(product => (
                      <tr key={product.id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <ProductImage className='max-w-32 max-h-28 object-cover' src={product?.ProductImage[0]?.url ? product?.ProductImage[0]?.url : ""} height={600} width={600} alt={product.ProductImage[0]?.url ?? "NoImage"} />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{product.title}</td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {product.price}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {product.gender}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{product.inStock}</td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{product.sizes.join(',')}</td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <Link href={`/admin/product/${product.slug}`} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                            Ver mas
                          </Link>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}