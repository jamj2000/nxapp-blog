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
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await getUserById(token.sub)
            if (user) {
                token.name = user.name
                token.email = user.email
                token.image = user.image
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token?.sub;     // Para incluir ID de usuario
            session.user.name = token?.name
            session.user.email = token?.email
            session.user.image = token?.image
            session.user.role = token?.role

            return session
        }
    }
}



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...options, ...authConfig })
