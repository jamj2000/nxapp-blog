'use client'
import { deletePost } from "@/lib/actions";
import { RefreshCwIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";   // IMPORTANTE: No importar desde next/router
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";



function PostEliminar({ post }) {
    const formId = useId()
    const [state, action, pending] = useActionState(deletePost, {})
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
                <input type="hidden" name="id" defaultValue={post.id} />

                <button type="submit" disabled={pending}
                    className='self-end mb-4 font-bold bg-red-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700 hover:text-gray-100 disabled:bg-zinc-400'
                >
                    {pending
                        ? <div><RefreshCwIcon className='inline animate-spin' /> Eliminando...</div>
                        : <div><TrashIcon className='inline' /> Eliminar</div>
                    }
                </button>
            </form>
            <h1 className="text-xl">{post.title}</h1>
            <p className="text-xs text-gray-500">Autor/a: {post.author.name}</p>
            <p className="text-xs text-gray-500">Creado: {post.created.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Última modificación: {post.modified.toLocaleString()}</p>
            <p className="text-gray-500 text-xs italic">Vistas: {post.views}</p>

            <div className="mt-10 flex flex-col md:flex-row gap-8">
                <img src={post.image || '/pwa/icon-256x256.png'} alt="blog image" className="w-full md:w-1/3 object-cover" />
                <div dangerouslySetInnerHTML={{ __html: post.post }} className="tiptap" />
            </div>
        </div>
    );
}

export default PostEliminar;