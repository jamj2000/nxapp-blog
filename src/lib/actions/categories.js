'use server'
import prisma from '@/lib/prisma'
import slugify from 'slugify'
import { revalidatePath } from 'next/cache'


export async function newCategory(prevState, formData) {

    const name = formData.get('name');
    const slug = slugify(name.toLowerCase())

    try {
        await prisma.category.create({
            data: { name, slug },
        })

        revalidatePath('/categories')
        return { success: 'Categoría creada' }
    } catch (error) {
        return { error }
    }

}


export async function editCategory(prevState, formData) {
    const id = Number(formData.get('id'))
    const name = formData.get('name');
    const slug = slugify(name.toLowerCase())

    // Array con IDs de todos las posts. Formato: [ {id: 1}, {id: 2}, ...]
    const postsIDs = await prisma.post.findMany({
        select: { id: true }
    })

    const connect = postsIDs.filter(post => formData.get(post.id) !== null)
    const disconnect = postsIDs.filter(post => formData.get(post.id) === null)
    const posts = { connect, disconnect }


    try {
        await prisma.category.update({
            where: { id },
            data: { name, slug, posts },
        })
        revalidatePath('/categories')
        return { success: 'Categoría modificada' }
    } catch (error) {
        return { error }
    }

}

export async function deleteCategory(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.category.delete({
            where: {
                id: id,
            },
        })
        revalidatePath('/categories')
        return { success: 'Categoría eliminada' }
    } catch (error) {
        return { error }
    }

}

