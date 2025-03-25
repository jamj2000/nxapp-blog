'use client'
import { RefreshCcw, SquareArrowOutUpRightIcon } from "lucide-react";
import { useFormStatus } from "react-dom";



function PublishButton({ post }) {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending}
            className={`${post.is_draft ? 'bg-slate-300' : 'bg-slate-600'} disabled:bg-stone-700 p-2 rounded-full self-end hover:bg-slate-400 `}
            title={`${post.is_draft ? 'Publicar post' : 'Despublicar'}`}>
            {pending
                ? <RefreshCcw className={`text-white size-4 animate-spin`} />
                : <SquareArrowOutUpRightIcon className={`text-white size-4`} />
            }

        </button>
    );
}

export default PublishButton