import { PencilIcon, SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";
import Modal from "@/components/modal";
import PostModificar from "@/components/posts/modificar";
import PostEliminar from "@/components/posts/eliminar";
import { getCategories, getPostBySlug } from "@/lib/data";
import { auth } from "@/auth";
import { incrementarVista, publishPost } from "@/lib/actions";


async function Post({ slug, className }) {
    const session = await auth()
    const post = await getPostBySlug(slug)
    const categories = await getCategories()

    incrementarVista(post.id)

    return (
        <div className={className}>
            {/* Título */}
            <div className="flex justify-between">
                <h1 className="text-4xl font-black">{post.title}</h1>
                {session?.user?.role === 'ADMIN' &&
                    <div className='flex gap-1 justify-end items-start'>

                        <form action={publishPost.bind(null, post.id)}>
                            <button
                                className={`${post.is_draft ? 'bg-slate-300' : 'bg-slate-600'} p-2 rounded-full self-end hover:bg-slate-400`}
                                title={`${post.is_draft ? 'Publicar post' : 'Despublicar'}`}>
                                <SquareArrowOutUpRightIcon className='text-white size-4' />
                            </button>
                        </form>

                        <Modal
                            openElement={<div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                <PencilIcon className='size-4' />
                            </div>}>
                            <PostModificar post={post} categories={categories} />
                        </Modal>
                        <Modal
                            openElement={<div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                                <TrashIcon className='size-4' />
                            </div>}>
                            <PostEliminar post={post} />
                        </Modal>
                    </div>
                }
            </div>
            {/* Contenido */}
            <div className="@container">
                <div className="mt-10 flex flex-col md:flex-row gap-8">
                    <img src={post.image || '/blog-logo.png'} alt="" className="w-full md:w-1/6 object-cover" />
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