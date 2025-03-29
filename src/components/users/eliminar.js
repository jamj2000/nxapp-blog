'use client'
import { deleteUser } from "@/lib/actions";
import { RefreshCwIcon, TrashIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";   // IMPORTANTE: No importar desde next/router
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";



function UserEliminar({ user }) {
    const formId = useId()
    const [state, action, pending] = useActionState(deleteUser, {})
    const { refresh } = useRouter()


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
            refresh()  // refrescamos página despues de mostrar toast
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])



    return (
        <div>
            <form id={formId} action={action} className="w-full flex flex-col px-4">
                <input type="hidden" name="id" defaultValue={user.id} />

                <button type="submit" disabled={pending}
                    className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
                >
                    {pending
                        ? <div><RefreshCwIcon className='inline animate-spin' /> Eliminando...</div>
                        : <div><TrashIcon className='inline' /> Eliminar</div>
                    }
                </button>
            </form>
            <div className="grid md:grid-cols-[80px_auto]">
                {user.image
                    ? <img src={user.image} alt="Imagen de usuario" width={64} />
                    : <UserIcon className="size-16" />
                }

                <div>
                    <h1 className="text-xl">{user.name}</h1>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                    {user.active
                        ? <p className="text-xs text-green-500">Cuenta activada</p>
                        : <p className="text-xs text-red-500">Cuenta desactivada</p>
                    }

                </div>
            </div>

        </div>
    );
}

export default UserEliminar;