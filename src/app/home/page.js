import Spinner from "@/components/spinner";
import { Suspense } from "react";
import PublishedPosts from '@/components/posts/publicados'

function HomePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-10">Inicio</h1>
            <Suspense fallback={<Spinner />}>
                <PublishedPosts />
            </Suspense>
        </div>
    );
}

export default HomePage;







