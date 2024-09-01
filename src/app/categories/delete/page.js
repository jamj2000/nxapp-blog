import Form from "@/components/forms/category"
import { deleteCategory } from "@/lib/actions"


async function page({ searchParams }) {

  return (
    <div>
      <h3 className="text-center">Eliminar categoria {searchParams.id}</h3>
      <Form action={deleteCategory} title='Eliminar categoria' id={searchParams.id} disabled={true} />
    </div>
  )
}

export default page