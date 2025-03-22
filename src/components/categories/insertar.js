'use client'
import { newCategory } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import Tiptap from '@/components/tiptap';
import InputImage from '@/components/input-image';





export default function CategoryInsertar() {
    const formId = useId()
    const [state, action, pending] = useActionState(newCategory, {})


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} className="w-full flex flex-col px-4">

            <button type="submit" disabled={pending}
                className='self-end mb-4 font-bold bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 hover:text-gray-100 disabled:bg-zinc-400'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline' /> Guardar</div>
                }
            </button>

            <div className='flex flex-col md:flex-row md:gap-10'>
                {/* <InputImage imgUrl={'/pwa/icon-256x256.png'} className="w-full md:w-1/3 object-cover" /> */}

                <div className='w-full md:w-2/3 flex flex-col gap-2'>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='name' className="font-bold w-full md:w-1/4">Título</label>
                        <input type='text' id='name' name='name' required
                            placeholder='Nombre'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>


                    {/* <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor="views" className="font-bold w-full md:w-1/4"> Vistas </label>
                        <input
                            id="views"
                            name="views"
                            type="number"
                            defaultValue={0}
                            min={0}
                            className='text-right w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100'
                        />
                    </div> */}
                    {/* <Suspense fallback={'Loading ...'}>
                            <Categories categoryId={category?.id} disabled={disabled} />
                        </Suspense> */}
                </div>
            </div>


            {/* {children} */}


        </form>
    )
}