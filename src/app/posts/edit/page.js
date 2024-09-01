import Form from "@/components/forms/post";
import { editPost } from "@/lib/actions";


async function page({ searchParams }) {

  return (
    <div>
      <Form action={editPost} title={`Actualizar post ${searchParams.id}`} id={searchParams.id} />
    </div>
  );
}

export default page;

