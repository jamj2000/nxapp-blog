import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const N_POSTS = 51

const CATEGORIES = [
  { name: "Desarrollo Web", slug: "desarrollo-web" },
  { name: "Seguridad Informática", slug: "seguridad-informatica" },
  { name: "Inteligencia Artificial", slug: "inteligencia-artificial" },
  { name: "Bases de Datos y Almacenamiento de Datos", slug: "bases-de-datos-almacenamiento-datos" },
  { name: "Desarrollo de Software", slug: "desarrollo-software" }
];

const generateRandomCategory = () => {
  const randomCategory = faker.helpers.arrayElement(CATEGORIES)
  return { name: randomCategory.name, slug: randomCategory.slug };
};


const generateRandomPost = () => {

  const _title = faker.lorem.sentence()

  return {
    author: faker.person.firstName(),
    title: _title,
    image: faker.image.url(),
    post: `<h1>${faker.lorem.sentence()}</h1><p>${faker.lorem.paragraph()}</p>`,
    slug: faker.helpers.slugify(_title.toLowerCase().slice(0, -1)),
    views: faker.number.int(2000),
    categories: [generateRandomCategory(), generateRandomCategory()]
  };
};

const resetDatabase = async () => {
  // Eliminar posts y categories
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();

  // Reiniciar el contador de ID en la tabla posts y categories
  await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Post_id_seq" RESTART WITH 1;`;
};

const load = async () => {
  try {
    // reset database
    await resetDatabase();

    // Crear los posts
    for (let i = 0; i < N_POSTS; i++) { 
      const post = generateRandomPost();
      const createdPost = await prisma.post.create({
        data: {
          author: post.author,
          title: post.title,
          image: post.image,
          post: post.post,
          slug: post.slug,
          views: post.views,
          categories: {
            connectOrCreate: post.categories.map(category => ({
              where: { slug: category.slug },
              create: { name: category.name, slug: category.slug }
            }))
          }
        },
        include: {
          categories: true // Incluir las categorías en la respuesta
        }
      });

      console.log(`Post creado con el ID ${createdPost.id} y categorías conectadas:`, createdPost.categories);
    }
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await prisma.$disconnect();
  }
};

load();