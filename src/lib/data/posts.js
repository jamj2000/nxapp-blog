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



// export async function getPosts(authorId) {
//   try {
//     const posts = authorId
//       ? await prisma.post.findMany({ where: { authorId }, include: { author: true } })
//       : await prisma.post.findMany({ include: { author: true } })

//     return posts;
//   } catch (error) {
//     console.log(error);  
//     return null;
//   }
// }


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




// export async function getPostsByAuthor(authorId, page) {

//     // authorId = undefined
//     try {
//         // Consulta para obtener todos los posts
//         const posts = await prisma.post.findMany({
//             where: {
//                 // authorId: undefined,
//                 ...(!!authorId && { authorId }),
//                 // ...(role !== "ADMIN" && { authorId: id }), // Si no es ADMIN, solo ve sus posts
//             },
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




// export async function getPostsByCategory(slug, session) {

//     if (!session?.user) return null

//     const { role, id } = session.user; // Obtener rol y ID del usuario directamente de la sesión

//     // Buscar la categoría en la base de datos
//     const category = await prisma.category.findUnique({
//         where: { slug },  // Filtra por categoría
//         include: {
//             posts: true
//         }, // Incluir posts relacionados
//     });

//     // Filtrar posts según el rol del usuario
//     const posts =
//         session.user.role === "ADMIN"
//             ? category.posts // Admin ve todos los posts
//             : category.posts.filter((post) => post.authorId === session.user.id); // User ve solo los suyos

//     return posts
// }


// export async function getPostsIntoCategory(slug, session) {

//     if (!session?.user) return null

//     const { role, id } = session.user; // Obtener rol y ID del usuario directamente de la sesión

//     // Buscar la categoría en la base de datos
//     const category = await prisma.category.findUnique({
//         where: { slug },  // Filtra por categoría
//         include: {
//             posts: true
//         }, // Incluir posts relacionados
//     });

//     // Filtrar posts según el rol del usuario
//     const posts =
//         session.user.role === "ADMIN"
//             ? category.posts // Admin ve todos los posts
//             : category.posts.filter((post) => post.authorId === session.user.id); // User ve solo los suyos

//     return posts
// }




// export async function getPostsByCategory(categorySlug, session) {
//     // const session = await auth();

//     if (!session?.user) {
//         throw new Error("No autorizado");
//     }

//     const { role, id } = session.user; // Obtener rol y ID del usuario directamente de la sesión

//     return prisma.post.findMany({
//         where: {
//             categories: {
//                 some: { slug: categorySlug }, // Filtra por categoría
//             },
//             ...(role !== "ADMIN" && { authorId: id }), // Si no es ADMIN, solo ve sus posts
//         },
//         include: {
//             author: true,
//             categories: true,
//         },
//     });
// }



// export async function getPostsWithCategory(categoryName) {
//     try {
//         // console.log(categoryName);

//         const posts = await prisma.post.findMany({
//             where: {
//                 categories: {
//                     some: {
//                         slug: {
//                             contains: categoryName,
//                             mode: 'insensitive',
//                         },
//                     },
//                 }
//             },
//             orderBy: { title: 'asc' },
//             include: { author: true, categories: true }
//         })

//         // console.log(`FILTERED POSTS`, posts);
//         return posts;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }





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

