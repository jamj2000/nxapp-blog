'use server'
import prisma from '@/lib/prisma'
import cloudinary from "@/lib/cloudinary"
import slugify from 'slugify'
import { revalidatePath } from 'next/cache'






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

    return result.secure_url;
  } catch (error) {
    // console.log(error);
    // return null;
    return { error: error.message }
  }
}

// ------------------------  POSTS --------------------------------

export async function newPost(prevState, formData) {

  const authorId = formData.get('authorId');
  const title = formData.get('title');
  const post = formData.get('post');
  const slug = slugify(title.toLowerCase())
  const views = Number(formData.get('views'));
  let image;

  console.log({ authorId, title, image, post, slug, views });

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

  try {
    await prisma.post.create({
      data: {
        authorId, title, image, post, slug, views,
        categories,
      },
    })

    revalidatePath('/posts')
    return { success: 'Añadido nuevo post' }
  } catch (error) {

    // if (error.message.includes("Body exceeded 4mb limit")) {
    //   console.error("Error de tamaño de cuerpo:", error);
    //   return { success: false, message: "El archivo es demasiado grande. Reduce su tamaño." };
    // }
    // return { success: false, message: "Ocurrió un error inesperado." };
    return { error: error.message }
  }
}



export async function editPost(prevState, formData) {
  const id = Number(formData.get('id'))
  const title = formData.get('title');
  const post = formData.get('post');
  const slug = slugify(title.toLowerCase())
  const views = Number(formData.get('views'));
  let image;

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
  // console.log(`id`, post.id);
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

