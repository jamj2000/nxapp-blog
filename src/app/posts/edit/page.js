import Form from "@/components/forms/post";
import {prisma} from "@/lib/prisma";
import { editPost } from "@/lib/actions";

export const dynamic = "force-dynamic";

async function page({ searchParams }) {
  let post = null;

  try {
    post = await prisma.posts.findUnique({
      where: {
        id: Number(searchParams.id),
      },
    });
  } catch (error) {
    console.error("Error al obtener el post:", error);
  }

  // Verificar si post es null o undefined antes de usarlo
  if (!post) {
    return <div>post no encontrado</div>;
  }

  return (
  <div>
    <h3 className=" font-bold mb-4 text-center">Editar post {searchParams.id}</h3>
    <Form action={editPost} title="Editar post" post={post} />
  </div>

  );
}

export default page;

