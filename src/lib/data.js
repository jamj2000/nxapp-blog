import prisma from '@/lib/prisma'


// ----------------------------  USER ---------------------------

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  return user
}



export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email }
  });
  return user
}



// ----------------------------  CATEGORY ---------------------------

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: [{ name: 'asc' }],
      include: { posts: true }
    })

    return categories;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}


export async function getCategory(categoryId) {
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
    // console.log(error);  
    return null;
  }
}



export async function getCategoryBySlug(slug) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { posts: true }
    })
    return category;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}




// ----------------------------  POST ---------------------------


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


export async function getPostsWithCategory(categoryName) {
  try {
    // const posts = await prisma.post.findMany({
    //   include: { categories: true },
    //   orderBy: [{ name: 'asc' }],
    // })
    console.log(categoryName);

    const posts = await prisma.post.findMany({
      where: {
        categories: {
          some: {
            slug: {
              contains: categoryName,
              mode: 'insensitive',
            },
          },
        }
      },
      orderBy: { title: 'asc' },
      include: { author: true, categories: true }
    })

    console.log(`FILTERED POSTS`, posts);
    return posts;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}




export async function getAllPosts() {
  try {
    // Consulta para obtener todos los posts
    const posts = await prisma.post.findMany({
      include: { author: true, categories: true },
      orderBy: [ // { author: 'asc' }, { title: 'asc' },
        { created: 'desc' }
      ],
    });

    return posts;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}



export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({ include: { author: true } })

    return posts;
  } catch (error) {
    // console.log(error);  
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


export async function getPost(postId) {
  const id = Number(postId)
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true, categories: true }
    })

    return post;
  } catch (error) {
    // console.log(error);  
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
    // console.log(error);  
    return null;
  }
}
