import { getPublishedPosts } from "@/lib/data/posts"
import Post from "@/components/posts/item";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

export default async function PublishedPosts() {
    const publishedPosts = await getPublishedPosts()

    return (
        <div>
            {publishedPosts.map(post =>
                <Post
                    key={post.id}
                    slug={post.slug}
                    className="p-10 my-5 bg-slate-100 border border-slate-300 rounded-md"
                >
                    <Link href={`/home/${post.slug}`} className="text-sm font-bold cursor-pointer">
                        <div className='size-8 grid place-content-center rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'>
                            <ArrowUpRightIcon className='size-4' />
                        </div>
                    </Link>
                </Post>
            )}
        </div>
    );
}