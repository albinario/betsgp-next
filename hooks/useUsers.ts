import prisma from '@/lib/prismaClient'

export const getUsers = async () => {
	return await prisma.user.findMany()
}

export const getUser = async (id: number) => {
	return await prisma.user.findUnique({
		where: {
			id
		}
	})
}
