'use server'
import prisma from '@/lib/prisma'
import { PER_PAGE } from '../pagination'




export async function getPost(postId) {
    const id = Number(postId)
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: { author: true, categories: true }
        })

        return post;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function getPostBySlug(slug) {
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: { author: true, categories: true }
        })

        return post;
    } catch (error) {
        console.log(error);
        return null;
    }
}





export async function getPublishedPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: { is_draft: false },
            include: { author: true, categories: true },
            orderBy: [ // { author: 'asc' }, { title: 'asc' },
                { created: 'desc' }
            ],
        });
        // console.log(`posts`, posts);
        return posts;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}



export async function getPosts({ authorId, categorySlug, page, per_page }) {

    try {
        // Dentro de where, valores undefined equivalen a desactivar filtro 
        const [posts, total] = await prisma.$transaction([
            prisma.post.findMany({
                where: {
                    authorId: authorId,
                    ...(categorySlug && { categories: { some: { slug: categorySlug } } }), // Si hay categorySlug, filtramos     
                },
                include: { author: true, categories: true },
                orderBy: [ // { author: 'asc' }, { title: 'asc' },
                    { created: 'desc' }
                ],
                skip: (page - 1) * per_page,    // tipo number
                take: +per_page                 // convertimos per_page a number
            }),
            prisma.post.count({})
        ]);

        // console.log(total, posts.map(p => p.title));
        return {
            posts,  // paginated posts 
            total   // count of all posts
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}



