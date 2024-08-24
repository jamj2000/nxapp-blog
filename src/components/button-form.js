'use client'
import { useFormStatus } from 'react-dom'
import Spinner from './spinner'

function Button({title, className}) {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending} className={className} >
            {pending ? <Spinner /> : title }
        </button>
    )
}

export default Button