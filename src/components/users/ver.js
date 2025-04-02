import { UserRoundIcon } from "lucide-react";


function UserVer({ user }) {
    return (
        <div>
            <div className="grid md:grid-cols-[120px_auto] gap-4">

                <img src={user.image || '/images/avatar-80.png'} alt="Imagen de usuario" width={192} />

                <div>
                    {user.active
                        ? <p className="text-xs text-green-700">Cuenta activada</p>
                        : <p className="text-xs text-red-700">Cuenta desactivada</p>
                    }
                    <h1 className="font-bold text-2xl">{user.name}</h1>
                    <p className="text-gray-500">email: {user.email}</p>
                    <p className="text-gray-500">rol: {user.role}</p>
                </div>
            </div>

            <h2 className="font-bold mt-4">Posts realizados</h2>
            <div className="flex flex-col gap-1">
                {user.posts
                    .sort((a, b) => a.created > b.created)
                    .map(post =>
                        <p key={post.id} className="flex gap-4">
                            <span>
                                {post.created.toLocaleString(Intl.DateTimeFormat("es-ES", {
                                    dateStyle: "full",
                                    timeStyle: "long",
                                    timeZone: "Europe/Madrid",
                                }))}
                            </span>
                            <span>{post.title}</span>
                        </p>
                    )}
            </div>
        </div>
    );
}

export default UserVer;