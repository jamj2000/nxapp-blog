// Run on edge
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    console.log(' MIDDLEWARE', req.nextUrl.pathname, req.auth);

    if (req.headers.get("content-length") > 4 * 1024 * 1024) { // 4MB declarado en next.config.js
        console.error("Solicitud rechazada: El archivo es demasiado grande.");
        return Response.json({ error: "El archivo es demasiado grande. Máximo permitido: 4MB." }, { status: 413 });
    }

    if (!req.auth) {  // NO AUTENTICADO

        let callbackUrl = req.nextUrl.pathname;
        if (req.nextUrl.search) {
            callbackUrl += req.nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(req.nextUrl.origin
            + `/auth/login?callbackUrl=${encodedCallbackUrl}`)
    }

})


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - auth
         * - about
         * - images (into /public)
         * - pwa (into /public) 
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - $ (root page)
         */
        '/((?!api|auth|home|about|images|pwa|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)',
    ],
}