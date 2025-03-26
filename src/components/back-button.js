'use client'
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // IMPORTANTE: No importar desde next/router

function BackButton() {
    const { back } = useRouter()
    return (

        <div
            onClick={back}
            className='size-8 grid place-content-center rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'>
            <ArrowLeftIcon className='size-4' />
        </div>
    );
}


export default BackButton;