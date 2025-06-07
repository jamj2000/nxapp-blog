'use server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { getUserByEmail } from '@/lib/data/auth'



export async function newUser(prevState, formData) {

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const role = formData.get('role')
    const active = Boolean(formData.get('active'))
    const image = formData.get('image')

    const user = await getUserByEmail(email)
    if (user)
        return { error: 'Este email ya está registrado.' }


    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                active,
                image
            }
        })

        revalidatePath('/dashboard')
        return { success: 'Usuario creado' }
    } catch (error) {
        return { error }
    }

}


export async function editUser(prevState, formData) {
    const id = formData.get('id')
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const role = formData.get('role')
    const active = Boolean(formData.get('active'))
    const image = formData.get('image')

    const user = await getUserByEmail(email)
    if (user && user.id != id)
        return { error: 'Este email ya está registrado.' }


    let hashedPassword
    if (password)
        hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                ...(password && { password: hashedPassword }),
                role,
                active,
                image
            }
        })
        revalidatePath('/dashboard')
        return { success: 'Usuario modificado' }
    } catch (error) {
        return { error }
    }

}

export async function deleteUser(prevState, formData) {
    try {
        const id = formData.get('id')

        await prisma.user.delete({
            where: { id }
        })
        revalidatePath('/dashboard')
        return { success: 'Usuario eliminado' }
    } catch (error) {
        return { error }
    }

}


export async function activeUser(id, active) {

    await prisma.user.update({
        where: { id },
        data: { active }
    })

    revalidatePath("/dashboard");
}

