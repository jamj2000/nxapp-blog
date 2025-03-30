import { PencilIcon, TrashIcon } from "lucide-react";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getPosts } from "@/lib/data/posts";
import { auth } from "@/auth";
import { incrementarVista, publishCategory } from "@/lib/actions/posts";
import Modal from "@/components/modal";
import CategoryModificar from "@/components/categories/modificar";
import CategoryEliminar from "@/components/categories/eliminar";
import { notFound } from "next/navigation";
import CategoryVer from "@/components/categories/ver";
import PostVer from "@/components/posts/ver";


async function Category({ slug, className }) {
    const category = await getCategoryBySlug(slug)

    if (!category) notFound()

    const session = await auth()

    let posts
    if (session?.user.role === 'ADMIN')
        posts = await getPosts({ categorySlug: slug })  // Posts de todos los autores
    else
        posts = await getPosts({ authorId: session?.user.id, categorySlug: slug })


    return (
        <div className={className}>
            {/* Nombre */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl text-bold">{category.name}</h1>
                    <p className="text-xs text-gray-500 mb-6">Slug: {category.slug}</p>
                </div>

                {session?.user?.role === 'ADMIN' &&
                    <div className='flex gap-1 justify-end items-start'>
                        <Modal
                            openElement={<div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                <PencilIcon className='size-4' />
                            </div>}>
                            <CategoryModificar category={category} posts={posts} />
                        </Modal>
                        <Modal
                            openElement={<div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                                <TrashIcon className='size-4' />
                            </div>}>
                            <CategoryEliminar category={category} />
                        </Modal>
                    </div>
                }
            </div>
            {/* Contenido */}
            <div>
                <p className="font-bold my-4">Posts en esta categoría</p>
                <div className="flex flex-col gap-1">
                    {posts?.map(post =>
                        <Modal key={post.id}
                            openElement={
                                <div className="cursor-pointer">
                                    {post.title}
                                </div>}
                        >
                            <PostVer post={post} />
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Category;