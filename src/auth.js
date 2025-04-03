import NextAuth from "next-auth"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/lib/data/auth"
import authConfig from "@/auth.config"


export const options = {
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error'
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token?.sub;     // Para incluir ID de usuario
            session.user.name = token?.name
            session.user.email = token?.email
            session.user.image = token?.image
            session.user.role = token?.role

            // Obtener la información actualizada del usuario en cada petición
            // const updatedUser = await getUserById(session.user.id)

            // if (updatedUser) {
            //     session.user.name = updatedUser.name; // Actualizar el nombre en la sesión
            //     session.user.email = updatedUser.email; // Actualizar el nombre en la sesión
            //     session.user.image = updatedUser.image; // Actualizar la imagen en la sesión
            // }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            try {
                const user = await getUserById(token.sub)
                if (user) {
                    token = {
                        ...token,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: user.role
                    }
                }
            } catch (error) {
                console.error("Error obteniendo datos de usuario:", error)
            }

            return token
        }
    },
}



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...options, ...authConfig })
