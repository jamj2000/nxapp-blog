

function CategoryVer({ category }) {
    return (
        <div>
            <h1 className="text-xl">{category.name}</h1>
            <p className="text-xs text-gray-500">Slug: {category.slug}</p>

            {/* <div className="mt-10 flex flex-col md:flex-row gap-8">
                <img src={category.image || '/pwa/icon-256x256.png'} alt="blog image" className="w-full md:w-1/3 object-cover" />
                <div dangerouslySetInnerHTML={{ __html: category.category }} className="tiptap" />
            </div> */}
        </div>
    );
}

export default CategoryVer;