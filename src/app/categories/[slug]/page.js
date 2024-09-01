import { auth } from "@/auth"
import { getCategoryBySlug } from "@/lib/actions"
import { FaPen, FaTrash } from "react-icons/fa6"
import Link from "next/link"

async function page({ params }) {
    const [ session, category ] = await Promise.all([
        auth(),
        getCategoryBySlug(params.slug)
    ])
    // const session = await auth()
    // const category = await getCategoryBySlug(params.slug)
    
    return (
        <div>
            {session?.user?.role === 'ADMIN' &&
                <div className='flex gap-1 justify-end'>
                    <Link
                        className='bg-yellow-400 p-4 rounded-full self-end hover:shadow-md'
                        title='Editar categoría'
                        href={{ pathname: '/categories/edit', query: { id: category.id } }}>
                        <FaPen size='1rem' color='white' />
                    </Link>
                    < Link
                        className='bg-red-400 p-4 rounded-full self-end hover:shadow-md'
                        title='Eliminar categoría'
                        href={{ pathname: '/categories/delete', query: { id: category.id } }}>
                        <FaTrash size='1rem' color='white' />
                    </Link>
                </div>
            }
            <h1><strong>{category.name}</strong></h1>
            {/* <p className="text-xs text-gray-500">Autor/a: {category.author}</p> */}
            {/* <p className="text-xs text-gray-500">Creado: {category.created.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Última modificación: {category.modified.toLocaleString()}</p> */}

  
        </div>
    )
}

export default page