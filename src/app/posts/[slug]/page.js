import { Suspense } from "react"
import Spinner1 from "@/components/spinner1"
import BackButton from "@/components/back-button"
import Post from "@/components/posts/item"



async function page({ params }) {
    const { slug } = await params

    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner1 />}>
                <Post slug={slug} />
            </Suspense>
        </div>
    )
}

export default page

