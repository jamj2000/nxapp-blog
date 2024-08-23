import Link from 'next/link';
import { auth } from "@/auth";
import { logout } from '@/lib/actions';

async function Header() {
    const session = await auth();

    return (
        <nav className="py-4 bg-cover bg-center bg-[#0d54a2]" style={{ borderBottomLeftRadius: '2px', borderBottomRightRadius: '2px', borderBottom: '2px solid black', opacity: '0.8' }}>
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <img src='/blog-logo.png' className="h-16 w-auto" alt="Logo" />
                    </Link>
                    <div className="bg-white h-16 w-1"></div>
                    {session ? (
                        <>
                            <Link href="/posts" className="text-lg font-bold text-white hover:text-gray-100">
                                Posts
                            </Link>
                            <Link href="/categories" className="text-lg font-bold text-white hover:text-gray-100">
                                Categorías
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/register" className="text-lg font-bold text-white hover:text-gray-100">
                                registro
                            </Link>
                            <Link href="/auth/login" className="text-lg font-bold text-white hover:text-gray-100">
                                iniciar sesión
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {session ? (
                        <form action={logout}>
                            <button type="submit" className="inline-flex items-center px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400">
                                Desconectar
                            </button>
                        </form>
                    ) : null}
                </div>
            </div>
        </nav>
    )
}

export default Header;
