// pages/categories/index.js
import Link from 'next/link'
import { auth } from "@/auth"
import Category from '@/components/Category'
import PaginationControls from '@/components/PaginationControls'
import { getCategories } from '@/lib/actions'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import { FaPlus, FaPen, FaTrash } from "react-icons/fa6";

export const dynamic = 'force-dynamic'

export default async function CategoryHome({ searchParams }) {
    const session = await auth()

    const page = Number(searchParams['page'] ?? PAGE)
    const per_page = Number(searchParams['per_page'] ?? PER_PAGE)

    const categories = await getCategories()

    // Calcular el índice de inicio y final
    const start = (page - 1) * per_page
    const end = start + per_page

    // Obtener la porción de categorías según la página
    let entries = []

    if (start >= 0 && start < categories.length) {
        entries = categories.slice(start, end)
    }

    return (
        <div>
            <div className='flex flex-col gap-4 justify-center'>
                {session?.user?.role === 'ADMIN' &&
                    <Link
                        className='bg-green-400 p-4 rounded-full self-end hover:shadow-md'
                        title="Nueva categoría"
                        href="/categories/new">
                        <FaPlus size='1rem' color='white' />
                    </Link>
                }
                <PaginationControls
                    currentPage={page}
                    hasNextPage={end < categories.length}
                    hasPrevPage={start > 0}
                    total={categories.length}
                />
                {entries.map((category) => (
                    <Category key={category.id} category={category}>
                        {session?.user?.role === 'ADMIN' &&
                            <div className='flex gap-1 justify-center'>
                                <Link
                                    className='bg-yellow-400 p-4 rounded-full self-end hover:shadow-md'
                                    title='Editar categoría'
                                    href={{ pathname: '/categories/edit', query: { id: category.id } }}>
                                    <FaPen size='1rem' color='white'  />
                                </Link>
                                < Link
                                    className='bg-red-400 p-4 rounded-full self-end hover:shadow-md'
                                    title='Eliminar categoría'
                                    href={{ pathname: '/categories/delete', query: { id: category.id } }}>
                                    <FaTrash size='1rem' color='white'  />
                                </Link>
                            </div>
                        }
                    </Category>
                ))}
                <PaginationControls
                    currentPage={page}
                    hasNextPage={end < categories.length}
                    hasPrevPage={start > 0}
                    total={categories.length}
                />
            </div>


        </div>
    )
}
