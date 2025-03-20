import { auth } from "@/auth"
import { PlusIcon } from "lucide-react";
import { Suspense } from 'react';
import Spinner from '@/components/spinner';
import Categories from '@/components/categories/lista'
import Modal from "@/components/modal";
import CategoryInsertar from "@/components/categories/insertar";


async function PaginaCategories({ searchParams }) {
    const session = await auth()

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Categories</h1>
            <div className='flex flex-col gap-4 justify-center'>
                {session?.user?.role === 'ADMIN' &&
                    <Modal openElement={
                        <div className='justify-self-end size-8 grid place-content-center rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'>
                            <PlusIcon className='size-4' />
                        </div>}>
                        <CategoryInsertar />
                    </Modal>
                }
                <Suspense fallback={<Spinner />}>
                    <Categories searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    )
}

export default PaginaCategories;