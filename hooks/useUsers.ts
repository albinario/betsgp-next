import prisma from '@/prisma/client'

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
