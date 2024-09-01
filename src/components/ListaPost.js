import Link from 'next/link';
import Post from '@/components/Post'
import PaginationControls from '@/components/PaginationControls'
import { PAGE, PER_PAGE } from '@/lib/pagination'
import { FaPen, FaTrash, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getPostsWithCategory, getAllPosts } from '@/lib/actions'
import { auth } from "@/auth"


async function ListaPost({ searchParams }) {
    const session = await auth()

    const page = Number(searchParams['page'] ?? PAGE)
    const per_page = Number(searchParams['per_page'] ?? PER_PAGE)
    const category = searchParams['category'] ?? ''

    let posts = []
    if (category) {
        posts = await getPostsWithCategory(category)
    } else {
        posts = await getAllPosts(page)
    }

    // mocked, skipped and limited in the real app
    const start = (page - 1) * per_page // 0, 5, 10 ...
    const end = start + per_page    // 5, 10, 15 ...

    let entries = []

    if (start >= 0 && start < posts.length)   // check limits
        entries = posts.slice(start, end)     // get posts slice

    return (
        <>
            <PaginationControls
                currentPage={page}
                hasNextPage={end < posts.length}
                hasPrevPage={start > 0}
                total={posts.length}
            />
            {entries.map((post) => (
                <Post key={post.id} post={post}>
                    {session?.user?.role === 'ADMIN' &&
                        <div className='flex gap-1 justify-center'>
                            {post.is_draft &&
                                <Link
                                    className='bg-blue-400 p-4 rounded-full self-end hover:shadow-md'
                                    title='Publicar post'
                                    href={{ pathname: '/posts/edit', query: { id: post.id } }}>
                                    <FaArrowUpRightFromSquare size='1rem' color='white' />
                                </Link>
                            }
                            <Link
                                className='bg-yellow-400 p-4 rounded-full self-end hover:shadow-md'
                                title='Editar post'
                                href={{ pathname: '/posts/edit', query: { id: post.id } }}>
                                <FaPen size='1rem' color='white' />
                            </Link>
                            < Link
                                className='bg-red-400 p-4 rounded-full self-end hover:shadow-md'
                                title='Eliminar post'
                                href={{ pathname: '/posts/delete', query: { id: post.id } }}>
                                <FaTrash size='1rem' color='white' />
                            </Link>
                        </div>
                    }
                </Post>
            ))}
            <PaginationControls
                currentPage={page}
                hasNextPage={end < posts.length}
                hasPrevPage={start > 0}
                total={posts.length}
            />
        </>
    )
}

export default ListaPost