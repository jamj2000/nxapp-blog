import { auth } from "@/auth";
import Posts from "@/components/posts/lista";
import Spinner1 from "@/components/spinner1";
import Users from "@/components/users/lista";
import { logout } from "@/lib/actions/auth";
import { LockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Dashboard() {
    const session = await auth()

    if (!session) redirect('/auth/login')

    const { user: { name, email, image, role } } = session

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <form action={logout}>
                    <button className="flex gap-2 justify-center items-center px-4 py-2 rounded-full hover:outline hover:outline-slate-300 cursor-pointer" >
                        <LockIcon /> <span className="hidden md:block">Cerrar sesión</span>
                    </button>
                </form>
            </div>


            {/* <div className="flex flex-col items-center gap-4 md:flex-row md:justify-start"> */}
            <div className="grid md:grid-cols-[150px_auto]">
                {image
                    ? <img src={image} className="size-30" />
                    : <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg" className="size-30" />
                }
                <div className="my-2 flex flex-col gap-2">
                    <p className="font-bold">{name}</p>
                    <p>{email}</p>
                    <p>{role}</p>
                </div>
            </div>


            {session.user.role === 'ADMIN' &&
                <>
                    <h1 className="text-xl font-bold mt-15">Usuarios</h1>
                    <Suspense fallback={<Spinner1 />}>
                        <Users />
                    </Suspense>
                </>
            }

            {session.user.role === 'USER' &&
                <>
                    <h1 className="text-xl font-bold mt-15">Posts creados</h1>
                    <div className='flex flex-col gap-4 justify-center'>
                        <Suspense fallback={<Spinner1 />}>
                            <Posts authorId={session?.user.id} />
                        </Suspense>
                    </div>
                </>
            }

        </div >
    );
}

export default Dashboard;