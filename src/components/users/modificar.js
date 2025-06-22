'use client'
import { editUser } from '@/lib/actions/users'
import { useActionState, useEffect, useId, useRef } from 'react'
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import CheckBox from '@/components/check-box';
import InputAvatar from '@/components/input-avatar';





export default function UserModificar({ session, user, onClose }) {
    // const formId = useId()
    const formRef = useRef(null);
    const [state, action, pending] = useActionState(editUser, {})

    useEffect(() => {

        if (!formRef.current) return;

        const dialog = formRef.current.closest('dialog');

        if (state?.success) {
            toast.success(state.success)
            onClose?.() // ✅ cerrar modal si éxito
            // dialog?.closest('dialog')?.close();
            // document.getElementById(formId)?.closest('dialog')?.close()
        }
        if (state?.error) {
            toast.error(state.error)
            // document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, onClose])


    return (
        <form ref={formRef} action={action} className="w-full flex flex-col gap-2 px-4 @container">
            <input type="hidden" name="id" defaultValue={user.id} />

            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Actualizando...</div>
                    : <div><PlusIcon className='inline' /> Actualizar </div>
                }
            </button>

            {session.user.role === 'ADMIN'
                ? <CheckBox
                    key={`active-${user.active}`}  // Para actualizar VDOM al detectar cambio
                    name='active'
                    defaultChecked={user.active}
                    className={"self-end mb-4 text-xs w-fit after:content-['_Cuenta_no_activa'] has-checked:after:content-['_Cuenta_activa'] bg-transparent text-gray-500 has-checked:bg-green-200 has-checked:text-green-700 px-2 py-1 rounded-full"}
                />
                : <input type="hidden" name="active" defaultValue={user.active} />
            }




            <InputAvatar user={user} />










            <div className='flex flex-col md:flex-row md:gap-10'>

                <div className='w-full md:w-2/3 flex flex-col gap-2'>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='name' className="font-bold w-full md:w-1/4">Nombre</label>
                        <input type='text' id='name' name='name'
                            defaultValue={user.name}
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='email' className="font-bold w-full md:w-1/4">Email</label>
                        <input type='text' id='email' name='email'
                            defaultValue={user.email}
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='password' className="font-bold w-full md:w-1/4">Contraseña</label>
                        <input type='text' id='password' name='password'
                            placeholder='no cambiar'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>


                    {session.user.role === 'ADMIN' &&
                        <div className="flex flex-col md:flex-row items-center md:space-x-4">
                            <label htmlFor='role' className="font-bold w-full md:w-1/4">Rol</label>
                            <select
                                key={user.role}
                                id="role"
                                name="role"
                                defaultValue={user.role}
                                className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                            >
                                <option value='USER'> USER </option>
                                <option value='ADMIN'> ADMIN </option>
                            </select>
                        </div>
                    }


                </div>
            </div>

        </form>
    )
}