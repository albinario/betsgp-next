'use server'
import prisma from '@/prisma/client'
import type { UserNew } from '@/types'

export const createUser = async (data: UserNew) => {
	await prisma.user.create({ data })
}

export const getUsers = async () => {
	return await prisma.user.findMany()
}

export const getUserRaw = async (uid: string) => {
	return await prisma.user.findUnique({
		where: {
			uid
		}
	})
}

export const getUser = async (id: number, year: number) => {
	return await prisma.user.findUnique({
		where: {
			id
		},
		include: {
			userResults: {
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
							}
						}
					}
				},
				orderBy: {
					gpId: 'desc'
				}
			},
			userStandings: {
				orderBy: {
					year: 'desc'
				}
			},
			userStars: true
		}
	})
}
