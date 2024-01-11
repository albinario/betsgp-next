'use server'
import prisma from '@/prisma/client'
import type { RiderNew } from '@/types'

export const createRider = async (data: RiderNew) => {
	await prisma.rider.create({ data })
}

export const getRider = async (id: number, year = 2023) => {
	return await prisma.rider.findUnique({
		where: { id },
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
				},
				include: {
					gp: {
						include: {
							city: {
								include: {
									nation: true
								}
							},
							userPicks: {
								where: {
									OR: [{ pick1Id: id }, { pick2Id: id }, { pick3Id: id }]
								}
							}
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

export const getRidersActive = async (year = 2023) => {
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

export const getRidersNotActive = async () => {
	return await prisma.rider.findMany({
		where: {
			active: 0
		}
	})
}
