

function PostVer({ post }) {
    return (
        <div>
            <h1 className="text-4xl font-black">{post.title}</h1>
            <div className="@container">
                <div className="mt-10 flex flex-col md:flex-row gap-8">
                    <img src={post.image || '/blog-logo.png'} alt="" className="w-full md:w-1/6 object-cover" />
                    <div>
                        <p className="text-xs text-gray-500">Autor/a: {post.author.name}</p>
                        <p className="text-xs text-gray-500">Creado: {post.created.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Última modificación: {post.modified.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs italic">Vistas: {post.views}</p>
                        <p className="text-xs font-bold">Categorías:</p>
                        <p className="text-xs flex flex-wrap gap-3 text-gray-500">
                            {post.categories?.map(category =>
                                <span key={category.id} className="text-gray-500">
                                    {category.name}
                                </span>
                            )}
                        </p>

                    </div>

                </div>

                <div dangerouslySetInnerHTML={{ __html: post.post }} className="my-10 tiptap" />
            </div>
        </div>
    );
}

export default PostVer;