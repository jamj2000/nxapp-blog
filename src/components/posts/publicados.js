import { getPublishedPosts } from "@/lib/data"
import Post from "@/components/posts/item";

export default async function PublishedPosts() {
    const publishedPosts = await getPublishedPosts()

    return (
        <div>
            {publishedPosts.map(post =>
                <Post key={post.id} slug={post.slug} className="p-10 my-5 bg-slate-100 border border-slate-300 rounded-md" />
            )}
        </div>
    );
}