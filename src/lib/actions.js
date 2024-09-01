'use server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { getUserByEmail } from '@/lib/data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { faker } from '@faker-js/faker';
import cloudinary from "@/lib/cloudinary";


// REGISTER
export async function register(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  // Comprobamos si el usuario ya está registrado
  const user = await getUserByEmail(email);

  if (user) {
    return { error: 'El email ya está registrado' }
  }

  // Encriptamos password 
  const hashedPassword = await bcrypt.hash(password, 10)

  // Guardamos credenciales en base datos
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return { success: "Registro correcto" }
}



// LOGIN credentials
export async function login(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Comprobamos si el usuario está registrado
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: 'Usuario no registrado.' }
  }

  // Comparamos password 
  const matchPassword = await bcrypt.compare(password, user.password)

  if (user && matchPassword) {  // && user.emailVerified
    await signIn('credentials',
      {
        email, password,
        redirectTo: globalThis.callbackUrl
        // redirectTo: user.role == 'ADMIN' ? '/admin' : '/dashboard'
      })
    return { success: "Inicio de sesión correcto" }
  } else {
    return { error: 'Credenciales incorrectas.' }
  }

}




// LOGOUT
export async function logout() {
  try {
    await signOut({ redirectTo: '/' })
  } catch (error) {
    throw error
  }
}



async function imgUpload(file) {
  // console.log(file);

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = "base64";
  let base64Data = Buffer.from(fileBuffer).toString("base64");
  let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      folder: "blog",
      public_id: file.name.split(".").slice(0, -1).join("."),
      // width: 600,
    });
    // console.log(result);
    return result.secure_url;
  } catch (error) {
    console.log(error);
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



export async function getCategoryIds() {
  const CategoryIds = await prisma.category.findMany({
    select: { id: true }
  })
  // return CategoryIds.map(category => category.id)
  return CategoryIds.map(category => { return { id: category.id } })
}




export async function getPostsWithCategory(categoryName) {
  try {
    const posts = await prisma.post.findMany({
      include: { categories: true },
      orderBy: [ { name: 'asc' } ],
    })

    let filteredPosts = posts
    // const filteredPosts = posts.filter( post => post.categories.filter( cat => cat.name.localeCompare(categoryName)==0  ).length != 0 )
    if (categoryName) {
      filteredPosts = posts.filter(post => post.categories.filter(cat => cat.slug == categoryName).length != 0)
    }


    console.log('FILTERED POSTS', filteredPosts)
    return filteredPosts;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}




export async function getAllPosts() {
  try {
    // Consulta para obtener todos los posts
    const posts = await prisma.post.findMany({
      include: { categories: true },
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
    const posts = await prisma.post.findMany()

    return posts;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}


export async function getPost(postId) {
  const id = Number(postId)
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { categories: true }
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
      include: { categories: true }
    })

    return post;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}




export async function newPost(formData) {
  try {
    const author = formData.get('author');
    const title = formData.get('title');
    const post = formData.get('post');
    const slug = faker.helpers.slugify(title.toLowerCase())
    const views = Number(formData.get('views'));
    let image;

    const imageFile = formData.get("file");

    if (imageFile && imageFile.size > 0) {
      image = await imgUpload(imageFile);
    }
    else {
      image = '/blog-logo.png'
    }

    // Array con IDs de todas las categorias
    const categoriesID = await getCategoryIds() // Formato: [ {id: 1}, {id: 2}, ...]

    // -> Si no disponemos de NodeJS 21+ 
    // Array con IDs de categorias marcadas por el usuario
    const connect = categoriesID.filter(({ id }) => formData.get(id.toString()) !== null)

    // Array con IDs de categorias NO marcadas por el usuario
    const disconnect = categoriesID.filter(({ id }) => formData.get(id.toString()) === null)

    // Información para depuración
    console.log('POST CATEGORIES ', { connect, disconnect });

    // -> Si disponemos de NodeJS 21+
    // Objecto con 2 arrays: connect con IDs de categorias marcadas por el usuario y disconnect con IDs no marcados
    // const categories = Object.groupBy(categoriesID, ({ id }) => formData.get(id.toString()) !== null ? 'connect' : 'disconnect')
    // console.log('CATEGORIES ', categories);

    const posts = await prisma.post.create({
      data: {
        author, title, image, post, slug, views,
        categories: { connect }
      },
      include: { categories: true }
    })

    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }
  redirect('/posts');
}


export async function editPost(formData) {
  const id = Number(formData.get('id'))
  const author = formData.get('author');
  const title = formData.get('title');
  const post = formData.get('post');
  // const created = formData.get('created');
  // const modified = formData.get('modified');
  // const is_draft = formData.get('is_draft');
  const slug = faker.helpers.slugify(title.toLowerCase())
  const views = Number(formData.get('views'));
  let image;

  const imageFile = formData.get("file");

  if (imageFile && imageFile.size > 0) {
    image = await imgUpload(imageFile);
  }

  // Array con IDs de todas las categorias
  const categoriesID = await getCategoryIds() // Formato: [ {id: 1}, {id: 2}, ...]

  // -> Si no disponemos de NodeJS 21+ 
  // Array con IDs de categorias marcadas por el usuario
  const connect = categoriesID.filter(({ id }) => formData.get(id.toString()) !== null)

  // Array con IDs de categorias NO marcadas por el usuario
  const disconnect = categoriesID.filter(({ id }) => formData.get(id.toString()) === null)

  // Información para depuración
  console.log('POST CATEGORIES ', { connect, disconnect });

  // -> Si disponemos de NodeJS 21+
  // Objecto con 2 arrays: connect con IDs de categorias marcadas por el usuario y disconnect con IDs no marcados
  // const categories = Object.groupBy(categoriesID, ({ id }) => formData.get(id.toString()) !== null ? 'connect' : 'disconnect')
  // console.log('CATEGORIES ', categories);


  try {
    const posts = await prisma.post.update({
      where: { id },
      data: {
        author, title, image, post, slug, views,
        categories: { connect, disconnect }
        //categories  // -> Si hemos usado Object.groupBy disponible en NodeJS 21+
      },
      include: { categories: true }
    })
    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }
  redirect('/posts');
}



export async function deletePost(formData) {
  try {
    const id = Number(formData.get('id'))

    const posts = await prisma.post.delete({
      where: {
        id,
      },
    })
    revalidatePath('/posts')
  } catch (error) {
    console.log(error);
  }

  redirect('/posts');
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


export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: [ { name: 'asc' } ]
    })

    return categories;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}

export async function newCategory(formData) {
  try {
    const name = formData.get('name');
    const slug = formData.get('slug');

    const categories = await prisma.category.create({
      data: { name, slug },
    })

    revalidatePath('/categories')
  } catch (error) {
    console.log(error);
  }
  redirect('/categories');
}


export async function editCategory(formData) {
  const id = Number(formData.get('id'))
  const name = formData.get('name');
  const slug = formData.get('slug');

  try {
    const categories = await prisma.category.update({
      where: { id },
      data: { name, slug },
    })
    revalidatePath('/categories')
  } catch (error) {
    console.log(error);
  }
  redirect('/categories');
}

export async function deleteCategory(formData) {
  try {
    const id = Number(formData.get('id'))

    const categories = await prisma.category.delete({
      where: {
        id: id,
      },
    })
    revalidatePath('/categories')
  } catch (error) {
    console.log(error);
  }

  redirect('/categories');
}



export async function createHoppy(previousState, formData) {
  try {
    const content = formData.get('content')

    await new Promise((resolve) => setTimeout(resolve, 3000))
    return content
  } catch (error) {
    console.log(error);
  }

}


export async function incrementarVista(id) {

  await prisma.post.update({
    where: { id },
    data: {views: {increment: 1}}
  });
  revalidatePath('/posts')
}