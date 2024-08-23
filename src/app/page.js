import Link from 'next/link'
import { auth } from "@/auth"
// import Articulo from '@/components/Articulos'
// import { getPosts } from '@/lib/actions'
export const dynamic = 'force-dynamic'

export default async function Home() {
    // const articulos = await getPosts()
    const session = await auth()

    return (
        <main className="flex-grow flex justify-center items-center bg-cover bg-slate-50 overflow-y-hidden" >
            <div className="text-center bg-gr p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Blog</h1>
                <ul className="space-y-4">
                    <li>
                        <Link href="/categories" className="text-blue-500 hover:underline">Listado de categorias</Link>
                    </li>
                    <hr className="my-4 border-t-2 border-gray-200" />
                    <li>
                        <Link href="/posts" className="text-blue-500 hover:underline">Listado de posts</Link>
                    </li>
                    <hr className="my-4 border-t-2 border-gray-200" />
                    <li>
                        <Link href="/prueba.html" className="text-blue-500 hover:underline">Prueba HTML</Link>
                    </li>
                    <hr className="my-4 border-t-2 border-gray-200" />
                    <li>
                        <Link href="/prueba-csr" className="text-blue-500 hover:underline">Prueba CSR</Link>
                    </li>
                    <hr className="my-4 border-t-2 border-gray-200" />
                    <li>
                        <Link href="/prueba-ssr" className="text-blue-500 hover:underline">Prueba SSR</Link>
                    </li>
                </ul>
            </div>
        </main>
    )
}
