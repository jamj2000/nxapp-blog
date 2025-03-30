'use client';


export default function Error({ error, reset }) {
    return (
        <div className='grid place-content-center min-h-screen'>
            <h2 className='text-red-400 text-2xl font-bold'>Se produjo un error inesperado</h2>
            {/* <p>{error.message}</p> */}

            <ul className='list-disc p-4'>
                <li className='text-red-700'>¿Has intentado subir una imagen mayor de 4MB?</li>
                <li className='text-red-700'>¿Has superado el límite de 500 operaciones?</li>
            </ul>

            <button
                onClick={() => reset()}
                className="px-4 py-2 border mt-4 rounded-md text-white bg-blue-500">
                Intentar de nuevo
            </button>
        </div>
    );
}