'use client'
import { editCategory } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import Tiptap from '@/components/tiptap';
import InputImage from '@/components/input-image';
import Check from '../check';





export default function CategoryModificar({ category, posts }) {
    const formId = useId()
    const [state, action, pending] = useActionState(editCategory, {})

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])

    const IDs = category.posts.map(p => p.id)

    return (
        <form id={formId} action={action} className="w-full flex flex-col px-4">
            <input type="hidden" name="id" defaultValue={category.id} />

            <button type="submit" disabled={pending}
                className='self-end mb-4 font-bold bg-amber-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-amber-700 hover:text-gray-100 disabled:bg-zinc-400'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Actualizando...</div>
                    : <div><PlusIcon className='inline' /> Actualizar </div>
                }
            </button>

            <div className='flex flex-col md:flex-row md:gap-10'>
                {/* <InputImage imgUrl={category.image || '/pwa/icon-256x256.png'} className="w-full md:w-1/3 object-cover" /> */}

                <div className='w-full md:w-2/3 flex flex-col gap-2'>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='name' className="font-bold w-full md:w-1/4">Título</label>
                        <input type='text' id='name' name='name'
                            defaultValue={category.name}
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>
                    <p className="font-bold my-4">Posts en esta categoría</p>
                    <p className="flex flex-col gap-1">
                        {posts
                            ?.sort((a, b) => a.slug.localeCompare(b.slug))
                            .map(post =>
                                <Check
                                    key={post.id}
                                    id={post.id}
                                    label={post.title}
                                    defaultChecked={IDs.includes(post.id)}
                                    className={'text-gray-400 has-checked:text-gray-900'}
                                />
                            )}
                    </p>


                </div>
            </div>





        </form>
    )
}