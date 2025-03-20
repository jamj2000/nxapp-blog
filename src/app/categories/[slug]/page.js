import { Suspense } from "react"
import Spinner from "@/components/spinner"
import BackButton from "@/components/back-button"

import Category from "@/components/categories/item"



async function page({ params }) {
    const { slug } = await params

    return (
        <div>
            <BackButton />
            <div className="h-20"></div>

            <Suspense fallback={<Spinner />}>
                <Category slug={slug} />
            </Suspense>
        </div>
    )
}

export default page