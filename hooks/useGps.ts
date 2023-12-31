import prisma from '@/prisma/client'

export const getGps = async (year: number) => {
	return await prisma.gp.findMany({
		where: year
			? {
					dateTime: {
						gte: new Date(`${year}-01-01`),
						lte: new Date(`${year}-12-31`)
					}
			  }
			: undefined,
		include: {
			activity: {
				include: {
					user: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							userStars: true
						}
					}
				},
				orderBy: {
					id: 'desc'
				},
				take: 5
			},
			city: {
				include: {
					nation: true
				}
			},
			usersResults: {
				include: {
					user: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							userStars: true
						}
					}
				},
				orderBy: {
					pos: 'asc'
				}
			}
		}
	})
}
