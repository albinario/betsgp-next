'use server'
import prisma from '@/prisma/client'
import type { UserNew } from '@/types'

export const createUser = async (data: UserNew) => {
	await prisma.user.create({ data })
}

export const getUsers = async () => {
	return await prisma.user.findMany()
}

export const getUser = async (uid = '') => {
	return await prisma.user.findUnique({
		where: {
			uid
		}
	})
}
