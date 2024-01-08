'use server'
import prisma from '@/prisma/client'

export const getUserResults = async (gpId: number) => {
	return await prisma.userResult.findMany({
		where: {
			gpId
		},
		include: {
			user: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
					userStars: true,
					userPicks: {
						where: {
							gpId
						},
						include: {
							pick1: {
								include: {
									nation: true
								}
							},
							pick2: {
								include: {
									nation: true
								}
							},
							pick3: {
								include: {
									nation: true
								}
							}
						}
					}
				}
			}
		},
		orderBy: {
			pos: 'asc'
		}
	})
}
