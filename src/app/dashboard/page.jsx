import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { LockIcon } from "lucide-react";
import { redirect } from "next/navigation";

async function Dashboard() {
    const session = await auth()

    if (!session) redirect('/auth/login')

    const { user: { name, email, image } } = session

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>



            <div className="my-10 flex flex-col gap-2 items-center">
                <p className="font-bold">{name}</p>
                <p>{email}</p>

                {image
                    ?
                    <img src={image} className="size-30 rounded-full" />
                    :
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg" className="size-30 rounded-full" />
                }
                <form action={logout}>
                    <button className="flex gap-2 justify-center items-center px-4 py-2 rounded-full hover:outline hover:outline-slate-300 cursor-pointer" >
                        <LockIcon /> Cerrar sesión
                    </button>
                </form>

            </div>


        </div >
    );
}

export default Dashboard;