'use server'

import { prisma } from '@/lib/prisma'
import { PER_PAGE } from './pagination';





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