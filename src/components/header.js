import { BookTextIcon, HomeIcon, KeyRoundIcon, LetterTextIcon, LockIcon, MenuIcon, UserRoundIcon, XIcon } from 'lucide-react'
import { logout } from '@/lib/actions/auth';
import { auth } from '@/auth';
import MenuLink from '@/components/menu-link';
import Link from 'next/link'




export default async function Header() {
  const session = await auth()


  return (
    <nav className='w-full px-4 py-2 flex justify-between items-center bg-white/75 backdrop-blur-xs fixed bottom-0 md:bottom-auto md:top-0 '>

      <div className="flex items-center gap-1">
        {/* Control Menú */}
        <input type="checkbox" id="openMenu" className='hidden peer' defaultChecked={true} />

        <label htmlFor="openMenu" className='hidden peer-checked:block p-2 rounded-full hover:outline hover:outline-slate-600'>
          <XIcon />
        </label>

        <label htmlFor="openMenu" className='hidden peer-not-checked:block p-2 rounded-full hover:outline hover:outline-slate-600'>
          <MenuIcon />
        </label>


        {/* Menú */}
        <MenuLink label="Blog" href="/home" icon={<HomeIcon />} />
        <MenuLink label="Categories" href="/categories" icon={<BookTextIcon />} />
        <MenuLink label="Posts" href="/posts" icon={<LetterTextIcon />} />
      </div>


      {/* Sesión */}
      <div className='flex gap-2 items-center'>
        {session
          ?
          <div className="flex gap-2 items-center">
            <Link
              href="/dashboard"
              className="w-full rounded-full hover:outline hover:outline-slate-600 cursor-pointer">
              <img src={session.user.image || '/images/avatar-80.png'}
                width={40} height={40}
                alt='avatar' className='size-10 rounded-full' />
            </Link>

            <form className="flex gap-2 items-center">
              <button formAction={logout} className='flex items-center w-full p-2 rounded-full hover:outline hover:outline-slate-600 cursor-pointer'>
                <LockIcon /> {/*  Logout */}
              </button>
            </form>
          </div>
          :
          <Link href="/auth/login" className="flex items-center w-full p-2 rounded-full hover:outline hover:outline-slate-600 cursor-pointer">
            <KeyRoundIcon />      {/* Login */}
          </Link>
        }
      </div>
    </nav>
  )
}