import { logout } from "@/lib/actions"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

async function page() {
  const sesion = await auth()

  if (sesion) {
    return (
      <>
        <h1>Cerrar sesión</h1>
        <form>
          <button formAction={logout} className="logout">
            <img src="/logout.svg" alt="Exit" /> Cerrar sesión
          </button>
        </form>
      </>
    )
  }
  else {
    redirect('/auth/login')
  }
}

export default page