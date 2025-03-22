'use client'
import { editPost } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import Tiptap from '@/components/tiptap';
import InputImage from '@/components/input-image';





export default function PostModificar({ post, categories }) {
    const formId = useId()
    const [state, action, pending] = useActionState(editPost, {})

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])

    const IDs = post.categories.map(c => c.id)

    return (
        <form id={formId} action={action} className="w-full flex flex-col px-4">
            <input type="hidden" name="id" defaultValue={post.id} />

            <button type="submit" disabled={pending}
                className='self-end mb-4 font-bold bg-amber-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-amber-700 hover:text-gray-100 disabled:bg-zinc-400'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Actualizando...</div>
                    : <div><PlusIcon className='inline' /> Actualizar </div>
                }
            </button>

            <div className='flex flex-col md:flex-row md:gap-10'>
                <InputImage imgUrl={post.image || '/pwa/icon-256x256.png'} className="w-full md:w-1/3 object-cover" />

                <div className='w-full md:w-2/3 flex flex-col gap-2'>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='title' className="font-bold w-full md:w-1/4">Título</label>
                        <input type='text' id='title' name='title'
                            defaultValue={post.title}
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>


                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor="views" className="font-bold w-full md:w-1/4"> Vistas </label>
                        <input
                            id="views"
                            name="views"
                            type="number"
                            defaultValue={post.views}
                            min={0}
                            className='text-right w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100'
                        />
                    </div>
                    <p className="font-bold">Categorías:</p>
                    <div className="text-xs flex flex-wrap gap-3">
                        {categories?.map(category =>
                            <div key={category.id}>
                                <input
                                    id={category.id}
                                    type="checkbox"
                                    name={category.id}
                                    value={category.id}
                                    defaultChecked={IDs.includes(category.id)}
                                    className='peer hidden' />
                                <label htmlFor={category.id} className="px-2 py-1 text-gray-500 rounded-full peer-checked:bg-gray-500 peer-checked:text-gray-100 ">
                                    {category.name}
                                </label>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10 flex flex-col">
                <p className="font-bold mb-4">Contenido</p>
                {/* <textarea name='post' className='bg-slate-100 border border-slate-200' /> */}
                <Tiptap contenido={post.post} name='post' />
            </div>

            {/* {children} */}


        </form>
    )
}