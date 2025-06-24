'use client'
import { newPost } from '@/lib/actions/posts'
import { useActionState, useEffect, useId } from 'react'
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import Tiptap from '@/components/tiptap';
import InputImage from '@/components/input-image';
import CheckBox from '@/components/check-box';





export default function PostInsertar({ authorId, categories }) {
    const formId = useId()
    const [state, action, pending] = useActionState(newPost, {})


    useEffect(() => {
        document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos

        if (state?.success) toast.success(state.success)
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} className="w-full flex flex-col px-4">
            <input type="hidden" name="authorId" defaultValue={authorId} />

            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline' /> Guardar</div>
                }
            </button>

            <div className='flex flex-col gap-8 md:flex-row'>
                <InputImage imgUrl={'/pwa/icon-256x256.png'} className="self-center w-[60%] md:w-1/3 object-cover" />

                <div className='w-full md:w-2/3 flex flex-col gap-2'>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='title' className="font-bold w-full md:w-1/4">Título</label>
                        <input type='text' id='title' name='title' required
                            placeholder='Título'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>


                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor="views" className="font-bold w-full md:w-1/4"> Vistas </label>
                        <input
                            id="views"
                            name="views"
                            type="number"
                            defaultValue={0}
                            min={0}
                            className='text-right w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100'
                        />
                    </div>
                    <p className="font-bold">Categorías:</p>
                    <div className="text-xs flex flex-wrap gap-3">
                        {categories?.map(category =>
                            <div key={category.id}>
                                <CheckBox
                                    name={category.id}
                                    // la clase checkbox-label la hemos definido en el archivo globals.css 
                                    // también podemos hacerlo con clases de tailwind: has-checked:bg-blue-200 has-checked:text-blue-800
                                    // en archivo components/posts/modificar.js hemos empleamo clases tailwind en lugar de globals.css
                                    className={"checkbox-label px-2 py-1 text-gray-500 rounded-full"}>
                                    {category.name}
                                </CheckBox>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Editor Tiptap  */}
            <Tiptap contenido='' />



        </form>
    )
}