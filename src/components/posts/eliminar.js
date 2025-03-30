'use client'
import { deletePost } from "@/lib/actions/posts";
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
                    className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
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