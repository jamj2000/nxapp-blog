import { PAGE, PER_PAGE } from '@/lib/pagination';
import { getPostsWithCategoryApi, getAllPostsApi, getTotalPostsCount } from '@/lib/actionsApi';


export async function GET(request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const page = parseInt(url.searchParams.get("page")) || PAGE; // Obtén el número de página de la consulta, o usa 1 por defecto

  let posts;
  
  if (category) {
    // Si se proporciona un parámetro de categoría, busca posts solo en esa categoría
    posts = await getPostsWithCategoryApi(category, page);
  } else {
    // Si no se proporciona un parámetro de categoría, obtener todas según la página
    posts = await getAllPostsApi(page);
  }

  const responseBody = {
    total_posts: await getTotalPostsCount(),
    per_page: PER_PAGE,
    page: page,
    posts: posts
  };

  return new Response(JSON.stringify(responseBody), {
    headers: { 'Content-Type': 'application/json' }
  });
}


