'use server'
import prisma from '@/lib/prisma'





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





// export async function getPosts() {
//     try {
//         // Consulta para obtener todos los posts
//         const posts = await prisma.post.findMany({
//             orderBy: [ // { author: 'asc' }, { title: 'asc' },
//                 { title: 'asc' }
//             ],
//             // skip: (page - 1) * PER_PAGE,
//             // take: PER_PAGE
//         })

//         return posts;
//     } catch (error) {
//         console.error('Error:', error);
//         return null;
//     }
// }


// ??
// export async function getAllPosts(page) {
//     try {
//         // Consulta para obtener todos los posts
//         const posts = await prisma.post.findMany({
//             include: { author: true, categories: true },
//             orderBy: [ // { author: 'asc' }, { title: 'asc' },
//                 { created: 'desc' }
//             ],
//             // skip: (page - 1) * PER_PAGE,
//             // take: PER_PAGE
//         })

//         return posts;
//     } catch (error) {
//         console.error('Error:', error);
//         return null;
//     }
// }





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



export async function getPosts({ authorId, categorySlug, page }) {

    try {
        // Consulta para obtener todos los posts
        // dentro de where, valores undefined equivalen a desactivar filtro 
        const posts = await prisma.post.findMany({
            where: {
                authorId: authorId,
                categories: { some: { slug: categorySlug } }, // Filtra por categoría
            },
            include: { author: true, categories: true },
            orderBy: [ // { author: 'asc' }, { title: 'asc' },
                { created: 'desc' }
            ],
            // skip: (page - 1) * PER_PAGE,
            // take: PER_PAGE
        })

        return posts;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}



export async function getPaginatedPosts({ orderBy, start, end }) {
    try {
        const [total, posts] = await Promise.all([
            prisma.post.count(),
            prisma.post.findMany({
                take: end - start,
                skip: start,
                include: { author: true, categories: true },
                orderBy,
            })
        ])
        // const total = await prisma.post.count()
        // const posts = await prisma.post.findMany({
        //   take: end - start,
        //   skip: start,
        //   include: { categories: true }
        // })

        return { posts, total };
    } catch (error) {
        console.log(error);
        return null;
    }
}

