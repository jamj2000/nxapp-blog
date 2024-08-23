'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


function PaginationControls({ hasNextPage, hasPrevPage, total }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') ?? PAGE)
  const per_page = Number(searchParams.get('per_page') ?? PER_PAGE)

  return (
    <div className='flex justify-between items-center gap-2'>
      <button
        className='flex gap-1 items-center bg-blue-500 text-white p-2 rounded-md disabled:bg-slate-300'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`?page=${page - 1}`)
        }}>
        <FaChevronLeft /> prev page
      </button>

      <div className='flex-grow text-center'>
        {page} / {Math.ceil(total / per_page)}
      </div>

      <button
        className='flex gap-1 items-center bg-blue-500 text-white p-2 rounded-md disabled:bg-slate-300'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`?page=${page + 1}`)
        }}>
        next page <FaChevronRight /> 
      </button>
    </div>
  )
}

export default PaginationControls
