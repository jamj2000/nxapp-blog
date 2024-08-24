import { getPostBySlug } from "@/lib/actions"


async function page({ params }) {
    const post = await getPostBySlug(params.slug)


    return (
        <div>
            <h1><strong>{post.title}</strong></h1>            
            <p className="text-xs text-gray-500">Autor/a: {post.author}</p>    
            <p className="text-xs text-gray-500">Creado: {post.created.toLocaleString()}</p>  
            <p className="text-xs text-gray-500">Última modificación: {post.modified.toLocaleString()}</p>  
           
            <div className="mt-10 flex flex-col md:flex-row gap-8">
                <img src={post.image} alt="" className="w-full md:w-1/3" />
                <div dangerouslySetInnerHTML={{ __html: post.post }} />
            </div>

        </div>
    )
}

export default page