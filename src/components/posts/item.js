import { PencilIcon, TrashIcon } from "lucide-react";
import { getCategories } from "@/lib/data/categories";
import { getPostBySlug } from "@/lib/data/posts";
import { auth } from "@/auth";
import { incrementarVista, publishPost } from "@/lib/actions/posts";
import Modal from "@/components/modal";
import PostModificar from "@/components/posts/modificar";
import PostEliminar from "@/components/posts/eliminar";
import PublishButton from "@/components/publish-button";
import { notFound } from "next/navigation";


async function Post({ slug, className, children }) {
    const post = await getPostBySlug(slug)

    if (!post) notFound()

    const categories = await getCategories()
    const session = await auth()

    // Securizamos: para que nadie pueda acceder a un post que no se ha publicado.    
    if (post.is_draft) return (
        <div className="grid text-5xl text-stone-500">
            El post al que intentas acceder no está publicado.
        </div>
    )


    incrementarVista(post.id)

    return (
        <div className={className}>
            {/* Título */}
            <div className="flex flex-col-reverse gap-1 md:flex-row md:justify-between">

                <div className="flex gap-2 items-start">
                    <h1 className="text-4xl font-black">{post.title}</h1>
                    {children}
                </div>

                <div className='flex gap-1 justify-end items-start'>
                    {session?.user?.role === 'ADMIN' &&
                        <>
                            <form action={publishPost.bind(null, post)}>
                                <PublishButton post={post} />
                            </form>

                            <Modal
                                openElement={<div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                    <PencilIcon className='size-4' />
                                </div>}>
                                <PostModificar session={session} post={post} categories={categories} />
                            </Modal>
                            <Modal
                                openElement={<div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                                    <TrashIcon className='size-4' />
                                </div>}>
                                <PostEliminar post={post} />
                            </Modal>
                        </>
                    }
                </div>
            </div>
            {/* Contenido */}
            <div className="@container">
                <div className="mt-10 flex flex-col md:flex-row gap-8">
                    <img src={post.image || '/pwa/icon-256x256.png.png'} alt="" className="w-full md:w-1/6 object-cover" />
                    <div>
                        <p className="text-xs text-gray-500">
                            <span className="font-bold">Autor/a:</span> {post.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="font-bold">Creado:</span> {post.created.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="font-bold">Última modificación:</span> {post.modified.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="font-bold">Vistas:</span> {post.views}
                        </p>
                        <p className="text-xs text-gray-500 font-bold">Categorías:</p>
                        <p className="text-xs flex flex-wrap gap-x-3 text-gray-500">
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

export default Post;