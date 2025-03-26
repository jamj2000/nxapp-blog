import { Suspense } from 'react';
import Spinner1 from '@/components/spinner1';
import Categories from '@/components/categories/lista'



async function PaginaCategories({ searchParams }) {


    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Categories</h1>
            <div className='flex flex-col gap-4 justify-center'>

                <Suspense fallback={<Spinner1 />}>
                    <Categories searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    )
}

export default PaginaCategories;