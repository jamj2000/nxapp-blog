import Form from "@/components/forms/post"
import { deletePost } from "@/lib/actions"


async function page({ searchParams }) {

  return (
    <div>
      <Form action={deletePost} title={`Eliminar post ${searchParams.id}`} id={searchParams.id} disabled={true} />
    </div>
  )

}

export default page