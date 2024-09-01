'use client'
import Button from '@/components/button';
import { useState } from 'react';
import { login } from '@/lib/actions'


function LoginForm() {
    const [resultado, setResultado] = useState("")
    const [tipo, setTipo] = useState("")

    async function wrapper(data) {
        const message = await login(data) // Server action
        if (message?.success) {
            setTipo('success')
            setResultado(message.success);
        }
        if (message?.error) {
            setTipo('error')
            setResultado(message.error);
        }
    }
    return (
        <form action={wrapper} className='credentials'>
            <div>
                <label>Email</label>
                <input type='email' name='email' placeholder="name@mail.com"  className='w-full p-3'/>
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" name='password' placeholder="******"  className='w-full p-3' />
            </div>
            <p className={`info ${tipo}`}> {resultado} </p>
            <Button title="Iniciar sesión" className='px-8 py-4' />
        </form>

    );
};

export default LoginForm;