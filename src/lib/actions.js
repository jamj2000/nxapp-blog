'use server'
import cloudinary from "@/lib/cloudinary"
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth'
import { getUserByEmail } from '@/lib/data'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import slugify from 'slugify'
import { PER_PAGE } from '@/lib/pagination'


// ------------------------  AUTH --------------------------------


// REGISTER
export async function register(prevState, formData) {
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
export async function login(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Comprobamos si el usuario está registrado
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: 'Usuario no registrado.' }
  }
  // Comparamos password 
  let matchPassword = false

  if (user.password == null)  // Si no hay contraseña almacenada en BD
    matchPassword = true
  else
    matchPassword = await bcrypt.compare(password, user.password)

  if (user && matchPassword)  // && user.emailVerified
  {
    await signIn('credentials',
      {
        email, password,
        redirectTo: globalThis.callbackUrl
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



// ------------------------  API --------------------------------



export async function editPostJson({ postId, author, title, image, post, slug, views }) {
  const id = Number(postId);
  try {
    const editpost = await prisma.post.update({
      where: { id },
      data: { author, title, image, post, slug, views },
    });
    return editpost;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePostJson(postId) {
  const id = Number(postId);
  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostsWithCategoryApi(categoryName, page) {
  try {
    const startIndex = (page - 1) * PER_PAGE;
    const posts = await prisma.post.findMany({
      include: { categories: true },
      where: {
        categories: {
          some: {
            slug: categoryName
          }
        }
      },
      skip: startIndex,
      take: PER_PAGE
    });

    console.log('Posts:', posts);
    return posts;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getAllPostsApi(page) {
  try {
    const startIndex = (page - 1) * PER_PAGE;
    const posts = await prisma.post.findMany({
      include: { categories: true },
      skip: startIndex,
      take: PER_PAGE
    });

    console.log('All Posts:', posts);
    return posts;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getTotalPostsCount() {
  try {
    const totalPosts = await prisma.post.count();
    console.log('Total Posts:', totalPosts);
    return totalPosts
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}



// ------------------------  UPLOAD IMAGE --------------------------------

async function uploadImage(file) {
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

// ------------------------  POSTS --------------------------------

export async function newPost(prevState, formData) {
  try {
    const authorId = formData.get('authorId');
    const title = formData.get('title');
    const post = formData.get('post');
    const slug = slugify(title.toLowerCase())
    const views = Number(formData.get('views'));
    let image;

    const imageFile = formData.get("file");

    if (imageFile && imageFile.size > 0) {
      image = await uploadImage(imageFile);
    }
    else {
      image = '/pwa/icon-256x256.png'
    }

    // Array con IDs de todas las categories. Formato: [ {id: 1}, {id: 2}, ...]
    const categoriesIDs = await prisma.category.findMany({
      select: { id: true }
    })

    const connect = categoriesIDs.filter(category => formData.get(category.id) !== null)
    const categories = { connect }

    // Información para depuración
    // console.log('POST CATEGORIES ', categories);


    await prisma.post.create({
      data: {
        authorId, title, image, post, slug, views,
        categories,
      },
    })

    revalidatePath('/posts')
    return { success: 'Añadido nuevo post' }
  } catch (error) {
    return { error }
  }
}



export async function editPost(prevState, formData) {
  const id = Number(formData.get('id'))
  const title = formData.get('title');
  const post = formData.get('post');
  const slug = slugify(title.toLowerCase())
  const views = Number(formData.get('views'));
  let image;

  console.log(`POST`, post);
  const imageFile = formData.get("file");

  if (imageFile && imageFile.size > 0) {
    image = await uploadImage(imageFile);
  }

  // Array con IDs de todas las categories. Formato: [ {id: 1}, {id: 2}, ...]
  const categoriesIDs = await prisma.category.findMany({
    select: { id: true }
  })

  const connect = categoriesIDs.filter(category => formData.get(category.id) !== null)
  const disconnect = categoriesIDs.filter(category => formData.get(category.id) === null)
  const categories = { connect, disconnect }

  // Información para depuración
  // console.log('POST CATEGORIES ', categories);

  try {
    await prisma.post.update({
      where: { id },
      data: { title, image, post, slug, views, categories },
    })
    revalidatePath('/posts')
    return { success: 'Post actualizado' }
  } catch (error) {
    return { error }
  }
}



export async function deletePost(prevState, formData) {

  try {
    const id = Number(formData.get('id'))

    await prisma.post.delete({
      where: { id }
    })

    // revalidatePath('/posts')   // no revalidamos, refrescaremos página en el cliente
    return { success: 'Post eliminado' }
  } catch (error) {
    return { error }
  }

}


export async function publishPost(post) {
  // const post = await prisma.post.findUnique({ where: { id } });
  console.log(`id`, post.id);
  if (post) {
    await prisma.post.update({
      where: { id: post.id },
      data: { is_draft: !post.is_draft },
    })

    revalidatePath("/posts");
  }
}



export async function incrementarVista(id) {

  await prisma.post.update({
    where: { id },
    data: { views: { increment: 1 } }
  });

}



// ------------------------  CATEGORIES --------------------------------


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



// ------------------------  USERS --------------------------------


export async function newUser(prevState, formData) {

  const name = formData.get('name');
  const email = formData.get('email');

  try {
    await prisma.user.create({
      data: { name, email },
    })

    revalidatePath('/dashboard')
    return { success: 'Usuario creado' }
  } catch (error) {
    return { error }
  }

}


export async function editUser(prevState, formData) {
  const id = formData.get('id')
  const name = formData.get('name');
  const email = formData.get('email');


  try {
    await prisma.user.update({
      where: { id },
      data: { name, email },
    })
    revalidatePath('/dashboard')
    return { success: 'Usuario modificado' }
  } catch (error) {
    return { error }
  }

}

export async function deleteUser(prevState, formData) {
  try {
    const id = formData.get('id')

    await prisma.user.delete({
      where: { id },
    })
    revalidatePath('/dashboard')
    return { success: 'Usuario eliminado' }
  } catch (error) {
    return { error }
  }

}



