

function CategoryVer({ category }) {
    return (
        <div>
            <h1 className="text-xl">{category.name}</h1>
            <p className="text-xs text-gray-500">Slug: {category.slug}</p>

            <p className="font-bold my-4">Post en esta categoría</p>
            <p className="flex flex-col gap-1">
                {category.posts
                    ?.sort((a, b) => a.slug.localeCompare(b.slug))
                    .map(post =>
                        <span key={post.id} className="">
                            {post.title}
                        </span>
                    )}
            </p>
        </div>
    );
}

export default CategoryVer;