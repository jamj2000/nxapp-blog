import { auth } from "@/auth"
import { getPostBySlug, incrementarVista } from "@/lib/actions"
import { FaArrowUpRightFromSquare, FaPen, FaTrash } from "react-icons/fa6"
import Link from "next/link"



async function page({ params }) {
    const session = await auth()
    const post = await getPostBySlug(params.slug)

    await incrementarVista(post.id)

    return (
        <div>
            {session?.user?.role === 'ADMIN' &&
                <div className='flex gap-1 justify-end'>
                    <Link
                        className='bg-blue-400 p-4 rounded-full self-end hover:shadow-md'
                        title='Publicar post'
                        href={{ pathname: '/posts/edit', query: { id: post.id } }}>
                        <FaArrowUpRightFromSquare size='1rem' color='white' />
                    </Link>
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
            <h1><strong>{post.title}</strong></h1>
            <p className="text-xs text-gray-500">Autor/a: {post.author}</p>
            <p className="text-xs text-gray-500">Creado: {post.created.toLocaleString()}</p>
            <p className="text-gray-500 text-xs italic">Vistas: {post.views}</p>
            {/* <p className="text-xs text-gray-500">Última modificación: {post.modified.toLocaleString()}</p> */}

            <div className="mt-10 flex flex-col md:flex-row gap-8">
                <img src={post.image || '/blog-logo.png'} alt="" className="w-full md:w-1/3 object-cover" />
                <div dangerouslySetInnerHTML={{ __html: post.post }} />
            </div>

        </div>
    )
}

export default page