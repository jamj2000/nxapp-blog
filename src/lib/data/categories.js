'use server'
import prisma from "@/lib/prisma";



export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: [{ name: 'asc' }],
            include: { posts: true }
        })

        return categories;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function getCategoryById(categoryId) {
    const id = Number(categoryId)
    try {
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                posts: true
            }
        });

        return category;
    } catch (error) {
        console.log(error);
        return null;
    }
}



export async function getCategoryBySlug(slug) {
    try {
        const category = await prisma.category.findUnique({
            where: { slug },
            include: {
                posts: {
                    include: {
                        author: true
                    }
                }
            }
        })
        return category;
    } catch (error) {
        console.log(error);
        return null;
    }
}

