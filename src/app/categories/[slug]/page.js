import { getCategoryBySlug } from "@/lib/actions"


async function page({ params }) {
    const category = await getCategoryBySlug(params.slug)

    
    return (
        <div>
            <h1>{category.name}</h1>
  
        </div>
    )
}

export default page