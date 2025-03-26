import { PAGE, PER_PAGE } from '@/lib/pagination'
import { TrashIcon, EyeIcon, PencilIcon, PlusIcon } from "lucide-react";
import { getAllPosts, getAllPostsByAuthor, getCategories } from '@/lib/data'
import { auth } from "@/auth"
import { publishPost } from '@/lib/actions';
import Link from 'next/link';
import Modal from '@/components/modal';
import PostVer from '@/components/posts/ver'
import PostInsertar from '@/components/posts/insertar';
import PostModificar from '@/components/posts/modificar';
import PostEliminar from '@/components/posts/eliminar';
import PaginationControls from '@/components/pagination-control'
import { redirect } from 'next/navigation';  // IMPORTANTE: importar desde next/navigation
import PublishButton from '../publish-button';



async function Posts({ searchParams }) {
    const session = await auth()

    if (!session) redirect('/')

    const { page = PAGE, per_page = PER_PAGE, category = '' } = await searchParams

    const categories = await getCategories()

    let posts = []
    if (session.user?.role === 'ADMIN') {
        posts = await getAllPosts(page)
    }
    else {
        posts = await getAllPostsByAuthor(session.user?.id, page)
    }

    // if (category) {
    //     posts = await getPostsWithCategory(category)
    // } else {
    //     posts = await getAllPosts(page)
    // }


    // console.log(posts);
    // mocked, skipped and limited in the real app
    const start = (page - 1) * per_page // 0, 5, 10 ...
    const end = start + per_page    // 5, 10, 15 ...

    let entries = []

    if (start >= 0 && start < posts.length)   // check limits
        entries = posts.slice(start, end)     // get posts slice

    return (
        <>
            <Modal openElement={
                <div className='justify-self-end size-8 grid place-content-center rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'>
                    <PlusIcon className='size-4' />
                </div>}>
                <PostInsertar authorId={session?.user.id} categories={categories} />
            </Modal>

            <PaginationControls
                currentPage={page}
                hasNextPage={end < posts.length}
                hasPrevPage={start > 0}
                total={posts.length}
            />
            <div>
                {entries.map((post) => (
                    <div key={post.id} className="p-1 flex justify-between items-center odd:bg-slate-100">

                        <div className='flex gap-1 items-center'>

                            {session.user?.role === 'ADMIN' &&
                                <form action={publishPost.bind(null, post)}>
                                    <PublishButton post={post} />
                                </form>
                            }

                            <Link href={`/posts/${post.slug}`} className="font-bold cursor-pointer">
                                {post.title}
                            </Link>
                        </div>


                        <div className='flex justify-center items-center gap-1'>

                            <Modal openElement={
                                <div className='size-8 grid place-content-center rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'>
                                    <EyeIcon className='size-4' />
                                </div>}>
                                <PostVer post={post} />
                            </Modal>

                            {post.is_draft
                                ?
                                <Modal openElement={
                                    <div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                        <PencilIcon className='size-4' />
                                    </div>}>
                                    <PostModificar post={post} categories={categories} />
                                </Modal>
                                :
                                <div className='size-8 grid place-content-center rounded-full border border-slate-500 text-slate-700 bg-slate-200'>
                                    <PencilIcon className='size-4' />
                                </div>
                            }

                            {post.is_draft
                                ?
                                <Modal openElement={
                                    <div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                                        <TrashIcon className='size-4' />
                                    </div>}>
                                    <PostEliminar post={post} />
                                </Modal>
                                :
                                <div className='size-8 grid place-content-center rounded-full border border-slate-500 text-slate-700 bg-slate-200'>
                                    <TrashIcon className='size-4' />
                                </div>
                            }

                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default Posts