import Form from "@/components/forms/category"
import { newCategory } from "@/lib/actions"

function page() {
  return (
    <div>
        <h3>Nueva categoria</h3>
        <Form action={newCategory} title='Crear categoria'  />
    </div>
  )
}

export default page