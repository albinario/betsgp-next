'use server'
import prisma from '@/prisma/client'

export const getRider = async (id: number, year = 2023) => {
	return await prisma.rider.findUnique({
		where: { id },
		include: {
			nation: true,
			picks: true,
			riderResults: {
				where: {
					gp: {
						dateTime: {
							gte: new Date(`${year}-01-01`),
							lte: new Date(`${year}-12-31`)
						}
					}
				},
				include: {
					gp: {
						include: {
							city: {
								include: {
									nation: true
								}
							},
							userPicks: true
						}
					}
				},
				orderBy: {
					gpId: 'desc'
				}
			}
		}
	})
}

export const getRiders = async (year = 2023) => {
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
			nation: true,
			riderResults: {
				where: {
					gp: {
						dateTime: {
							gte: new Date(`${year}-01-01`),
							lte: new Date(`${year}-12-31`)
						}
					}
				}
			}
		}
	})
}
