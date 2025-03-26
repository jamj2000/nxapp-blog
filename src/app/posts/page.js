import { auth } from "@/auth"
import { Suspense } from 'react';
import Spinner1 from '@/components/spinner1';
import Posts from '@/components/posts/lista'



async function PaginaPosts({ searchParams }) {

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Posts</h1>

            <div className='flex flex-col gap-4 justify-center'>
                <Suspense fallback={<Spinner1 />}>
                    <Posts searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    )
}

export default PaginaPosts;