'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";


function PaginationControls({ hasNextPage, hasPrevPage, total }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') ?? PAGE)
  const per_page = Number(searchParams.get('per_page') ?? PER_PAGE)
  const category = searchParams.get('category') ?? ''

  const getHref = (newPage) => {
    const params = new URLSearchParams()
    params.set('page', String(newPage))
    if (category) params.set('category', category)
    if (per_page) params.set('per_page', per_page)
    return `?${params.toString()}`
  }



  return (
    <div className='flex justify-between items-center gap-2'>

      {/* Enlace anterior */}
      <button
        className='flex gap-1 items-center bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-slate-300'
        disabled={!hasPrevPage}
        onMouseEnter={() =>
          router.prefetch(`?page=${page - 1}&category=${category}`)
        }
        onClick={() => {
          router.push(`?page=${page - 1}&category=${category}`)
        }}>
        <ChevronLeftIcon />
      </button>

      {/* Contador */}
      <div className='flex-grow text-center'>
        {page} / {Math.ceil(total / per_page)}
      </div>


      {/* Enlace siguiente */}
      <button
        className='flex gap-1 items-center bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-slate-300'
        disabled={!hasNextPage}
        onMouseEnter={() =>
          router.prefetch(`?page=${page + 1}&category=${category}`)
        }
        onClick={() => {
          router.push(`?page=${page + 1}&category=${category}`)
        }}>
        <ChevronRightIcon />
      </button>
    </div>
  )
}

export default PaginationControls
