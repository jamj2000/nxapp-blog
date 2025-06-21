'use client'
import { useSearchParams } from 'next/navigation'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from 'next/link';    // Link permite prefetch para carga más rápida de páginas


function PaginationControls({ hasNextPage, hasPrevPage, total }) {
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') ?? PAGE)
  const per_page = Number(searchParams.get('per_page') ?? PER_PAGE)
  const category = searchParams.get('category') ?? ''

  const getHref = (newPage) => {
    const params = new URLSearchParams()
    params.set('page', String(newPage))
    if (category) params.set('category', category)
    // if (per_page) params.set('per_page', per_page)
    return `?${params.toString()}`
  }


  return (
    <div className='flex justify-between items-center gap-2'>

      {/* Enlace anterior */}
      {hasPrevPage
        ? <Link
          href={getHref(page - 1)}
          className='flex gap-1 items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'
          prefetch
        >
          <ChevronLeftIcon />
        </Link>
        : <span className='flex gap-1 items-center bg-slate-300 text-white py-2 px-4 rounded-md cursor-not-allowed'>
          <ChevronLeftIcon />
        </span>
      }

      {/* Contador */}
      <div className='flex-grow text-center'>
        {page} / {Math.ceil(total / per_page)}
      </div>


      {hasNextPage
        ? <Link
          href={getHref(page + 1)}
          className='flex gap-1 items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'
          prefetch
        >
          <ChevronRightIcon />
        </Link>
        : <span className='flex gap-1 items-center bg-slate-300 text-white py-2 px-4 rounded-md cursor-not-allowed'>
          <ChevronRightIcon />
        </span>
      }


    </div>
  )
}

export default PaginationControls
