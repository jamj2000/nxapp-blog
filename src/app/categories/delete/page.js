import Form from "@/components/forms/category"
import {prisma} from '@/lib/prisma'
import { deleteCategory } from "@/lib/actions"

export const dynamic = 'force-dynamic'

async function page({ searchParams }) {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(searchParams.id),
    },
  })

  return (
    <div>
      <h3 className="text-center">Eliminar categoria {searchParams.id}</h3>
      <Form action={deleteCategory} title='Eliminar categoria' category={category} disabled={true} />
    </div>
  )
}

export default page