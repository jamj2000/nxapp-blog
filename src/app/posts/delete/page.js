import Form from "@/components/forms/post"
import {prisma} from '@/lib/prisma'
import { deletePost } from "@/lib/actions"

export const dynamic = 'force-dynamic'

async function page({ searchParams }) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(searchParams.id),
    },
  })

  return (
    <div>
      <h3 className="font-bold text-center">Eliminar post {searchParams.id}</h3>
      <Form action={deletePost} title='Eliminar post' post={post} disabled={true} />
    </div>
  )
}

export default page