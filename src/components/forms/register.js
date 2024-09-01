'use client'
import Button from '@/components/button';
import { useState } from 'react';
import { register } from '@/lib/actions'
import { signIn } from 'next-auth/react'; // signIn desde lado CLIENTE


function RegisterForm() {
    const [resultado, setResultado] = useState("")
    const [tipo, setTipo] = useState("")

    async function wrapper(data) {
        const message = await register(data) // Server action
        if (message.success) {
            setTipo('success')
            setResultado(message.success);
            await signIn('credentials',
                {
                    email: data.get('email'),
                    password: data.get('password'),
                    callbackUrl: '/'
                })
        } else {
            setTipo('error')
            setResultado(message.error);
        }

    }
    return (
        <form action={wrapper} className='credentials'>
            <div>
                <label>Nombre</label>
                <input type='text' name='name' placeholder="José García" className='w-full p-3'/>
            </div>
            <div>
                <label>Email</label>
                <input type='email' name='email' placeholder="jose@mail.com" className='w-full p-3'/>
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" name='password' placeholder="******"  className='w-full p-3' />
            </div>
            <p className={`info ${tipo}`}> {resultado} </p>
            <Button title="Crear cuenta" className='px-8 py-4' />
        </form>


    );
};

export default RegisterForm;