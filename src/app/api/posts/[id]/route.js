import { getPost } from "@/lib/actions";
import { deletePostJson, editPostJson } from "@/lib/actionsApi";

export async function GET(request, { params }) {
    let post = await getPost(params.id);
    console.log(post)

    return Response.json(post)
}

export async function PUT(request, {params}) {
  const content = request.headers.get('content-type')

  if (content != 'application/json')
    return Response.json({ message: 'Debes proporcionar datos JSON' })


  const postModificado = await request.json()
  console.log(postModificado)

  const post = await editPostJson({postId: params.id,...postModificado});

  return Response.json(post)
}


export async function DELETE(request, { params }) {
    let post = await deletePostJson(params.id);

    return Response.json(post)
}