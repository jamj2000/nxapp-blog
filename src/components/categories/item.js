import { PencilIcon, SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";
import { getCategoryBySlug } from "@/lib/data";
import { auth } from "@/auth";
import { incrementarVista, publishCategory } from "@/lib/actions";
import Modal from "@/components/modal";
import CategoryModificar from "@/components/categories/modificar";
import CategoryEliminar from "@/components/categories/eliminar";


async function Category({ slug, className }) {
    const session = await auth()
    const category = await getCategoryBySlug(slug)

    return (
        <div className={className}>
            {/* Nombre */}
            <div className="flex justify-between">
                <h1 className="text-2xl text-bold">{category.name}</h1>
                {session?.user?.role === 'ADMIN' &&
                    <div className='flex gap-1 justify-end items-start'>

                        <Modal
                            openElement={<div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                <PencilIcon className='size-4' />
                            </div>}>
                            <CategoryModificar category={category} />
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
                <p className="text-xs text-gray-500 mb-10">Slug: {category.slug}</p>
                <p className="font-bold mb-4">Post en esta categoría</p>
                <p className="flex flex-col gap-1">
                    {category.posts?.map(post =>
                        <span key={post.id} className="">
                            {post.title}
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}

export default Category;