'use server'
import prisma from '@/prisma/client'

export const getUserStandings = async (year: number) => {
	return await prisma.userStanding.findMany({
		where: { year },
		include: {
			user: true
		},
		orderBy: {
			pos: 'asc'
		}
	})
}
