import Spinner1 from "@/components/spinner1";
import { Suspense } from "react";
import PublishedPosts from '@/components/posts/publicados'

function HomePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Inicio</h1>
            <Suspense fallback={<Spinner1 />}>
                <PublishedPosts />
            </Suspense>
        </div>
    );
}

export default HomePage;







