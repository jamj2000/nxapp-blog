import Link from "next/link"


function post({ children, post }) {
    return (
        <div className='flex justify-between p-4 rounded-md hover:shadow-md' >
            <div className="flex flex-col items-start">

                <Link href={`/posts/${post.slug}`} className="text-left">
                    <div>
                        <b>{post.title}</b>
                        <p className="text-gray-500 text-xs italic">Autor/a: {post.author}.</p>
                        <p className="text-gray-500 text-xs italic">Actualizado el {new Date(post.modified).toLocaleString()}</p>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default post