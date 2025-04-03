'use server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'



export async function newUser(prevState, formData) {

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const role = formData.get('role')
    const active = Boolean(formData.get('active'))
    const image = formData.get('image')

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.create({
            data: { name, email, password: hashedPassword, role, active, image },
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

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.update({
            where: { id },
            data: { name, email, password: hashedPassword, role, active, image },
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
            where: { id },
        })
        revalidatePath('/dashboard')
        return { success: 'Usuario eliminado' }
    } catch (error) {
        return { error }
    }

}


export async function activeUser(user) {
    if (user) {
        await prisma.user.update({
            where: { id: user.id },
            data: { active: !user.active },
        })

        revalidatePath("/dashboard");
    }
}


