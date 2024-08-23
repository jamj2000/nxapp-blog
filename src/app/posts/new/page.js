import Form from "@/components/forms/post"
import { newPost } from "@/lib/actions"

function page() {
  return (
    <div>
        <h3 className="font-bold text-center">Nuevo post</h3>
        <Form action={newPost} title='Crear post' post={null}  />
    </div>
  )
}

export default page