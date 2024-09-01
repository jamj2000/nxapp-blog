import Form from "@/components/forms/category";
import { editCategory } from "@/lib/actions";


async function page({ searchParams }) {

  return (
    <div >
      <h3>Editar categoria {searchParams.id}</h3>
      <Form action={editCategory} title="Editar categoria" id={searchParams.id} />
    </div>

  );
}

export default page;

