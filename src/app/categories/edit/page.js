import Form from "@/components/forms/category";
import { prisma } from "@/lib/prisma";
import { editCategory } from "@/lib/actions";

export const dynamic = "force-dynamic";

async function page({ searchParams }) {
  let category = null;

  try {
    category = await prisma.category.findUnique({
      where: {
        id: Number(searchParams.id),
      },
    });
  } catch (error) {
    console.error("Error al obtener la categoria:", error);
  }

  // Verificar si la categoria es null o undefined antes de usarlo
  if (!category) {
    return <div>categoria no encontrado</div>;
  }

  return (
    <div >
      <h3>Editar categoria {searchParams.id}</h3>
      <Form action={editCategory} title="Editar categoria" category={category} />
    </div>

  );
}

export default page;

