import { UserRoundIcon } from "lucide-react";


function UserVer({ user }) {
    return (
        <div>
            <div className="grid md:grid-cols-[80px_auto]">
                {user.image
                    ? <img src={user.image} alt="Imagen de usuario" width={64} />
                    : <UserRoundIcon className="size-16" />
                }

                <div>
                    <h1 className="text-xl">{user.name}</h1>
                    {user.active
                        ? <p className="text-xs text-green-700">Cuenta activada</p>
                        : <p className="text-xs text-red-700">Cuenta desactivada</p>
                    }
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                </div>
            </div>

            <p className="font-bold my-4">Post realizados</p>
            <p className="flex flex-col gap-1">
                {user.posts
                    ?.sort((a, b) => a.slug.localeCompare(b.slug))
                    .map(post =>
                        <span key={post.id} className="">
                            {post.title}
                        </span>
                    )}
            </p>
        </div>
    );
}

export default UserVer;