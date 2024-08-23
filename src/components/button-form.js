'use client'
import { useFormStatus } from 'react-dom'

function Button({title}) {
    const { pending } = useFormStatus()
    return (
        <button type="submit" disabled={pending} className='px-8 py-4' >
            {title}
        </button>
    )
}

export default Button