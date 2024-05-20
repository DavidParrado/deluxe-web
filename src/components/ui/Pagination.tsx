'use client';
import { generatePaginationNumbers } from "@/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? 1);

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathname}`
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`

  }

  return (
    <div className="flex items-center justify-between mt-6">
      <Link href={createPageUrl(currentPage - 1)} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>

        <span>
          Anterior
        </span>
      </Link>

      <div className="items-center hidden md:flex gap-x-3">
        {
          allPages.map(page => (
            <Link key={page} href={createPageUrl(page)} className={`px-2 py-1 text-sm ${page === currentPage ? 'text-blue-500 rounded-md bg-blue-100/60' : 'text-gray-500 rounded-md hover:bg-gray-100'}`}>{page}</Link>
          ))
        }
      </div>

      <Link href={createPageUrl(currentPage + 1)} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
        <span>
          Siguiente
        </span>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </Link>
    </div>
  )
}