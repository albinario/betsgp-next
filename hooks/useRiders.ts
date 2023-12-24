import prisma from '@/prisma/client'

export const getRiders = async () => {
	return await prisma.rider.findMany({
		where: {
			active: {
				not: 0
			}
		},
		orderBy: {
			active: 'asc'
		},
		include: {
			nation: true
		}
	})
}
