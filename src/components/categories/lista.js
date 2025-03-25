import { PAGE, PER_PAGE } from '@/lib/pagination'
import { TrashIcon, EyeIcon, PencilIcon, PlusIcon } from "lucide-react";
import { getCategories, getPosts } from '@/lib/data'
import { auth } from "@/auth"
import Modal from '@/components/modal';
import CategoryVer from '@/components/categories/ver'
import CategoryModificar from '@/components/categories/modificar';
import CategoryEliminar from '@/components/categories/eliminar';
import PaginationControls from '@/components/pagination-control'
import Link from 'next/link';
import CategoryInsertar from './insertar';

async function Categories({ searchParams }) {
    const session = await auth()

    const { page = PAGE, per_page = PER_PAGE } = await searchParams

    const categories = await getCategories()
    const posts = await getPosts()

    // console.log(categories);
    // mocked, skipped and limited in the real app
    const start = (page - 1) * per_page // 0, 5, 10 ...
    const end = start + per_page    // 5, 10, 15 ...

    let entries = []

    if (start >= 0 && start < categories.length)   // check limits
        entries = categories.slice(start, end)     // get categories slice

    return (
        <>
            {session?.user?.role === 'ADMIN' &&
                <Modal openElement={
                    <div className='justify-self-end size-8 grid place-content-center rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'>
                        <PlusIcon className='size-4' />
                    </div>}>
                    <CategoryInsertar />
                </Modal>
            }

            <PaginationControls
                currentPage={page}
                hasNextPage={end < categories.length}
                hasPrevPage={start > 0}
                total={categories.length}
            />
            <div>
                {entries.map((category) => (
                    <div key={category.id} className="p-1 flex justify-between items-center odd:bg-slate-100">

                        <div className='flex gap-1 items-center'>
                            <Link href={`/categories/${category.slug}`} className="font-bold cursor-pointer">{category.name}</Link>
                        </div>

                        {session?.user?.role === 'ADMIN' &&
                            <div className='flex justify-center items-center gap-1'>

                                <Modal openElement={
                                    <div className='size-8 grid place-content-center rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'>
                                        <EyeIcon className='size-4' />
                                    </div>}>
                                    <CategoryVer category={category} />
                                </Modal>
                                <Modal openElement={
                                    <div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                        <PencilIcon className='size-4' />
                                    </div>}>
                                    <CategoryModificar category={category} posts={posts} />
                                </Modal>
                                <Modal openElement={
                                    <div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                                        <TrashIcon className='size-4' />
                                    </div>}>
                                    <CategoryEliminar category={category} />
                                </Modal>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}

export default Categories