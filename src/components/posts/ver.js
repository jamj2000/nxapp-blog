

function PostVer({ post }) {
    return (
        <div>
            <h1 className="text-xl">{post.title}</h1>
            <p className="text-xs text-gray-500">Autor/a: {post.author.name}</p>
            <p className="text-xs text-gray-500">Creado: {post.created.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Última modificación: {post.modified.toLocaleString()}</p>
            <p className="text-gray-500 text-xs italic">Vistas: {post.views}</p>

            <div className="mt-10 flex flex-col md:flex-row gap-8">
                <img src={post.image || '/pwa/icon-256x256.png'} alt="blog image" className="w-full md:w-1/3 object-cover" />
                <div dangerouslySetInnerHTML={{ __html: post.post }} className="tiptap" />
            </div>
        </div>
    );
}

export default PostVer;