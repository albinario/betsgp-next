'use server'
import { isIdentical } from '@/helpers/array'
import prisma from '@/prisma/client'
import { RiderResultIncoming, UserResultNew } from '@/types'
import { updateUserStanding } from './userStandings'

export const createUserResult = async (gpId: number, userId: number) => {
	const existing = await prisma.userResult.findFirst({
		where: {
			gpId,
			userId
		}
	})

	if (!existing) {
		await prisma.userResult.create({
			data: {
				gpId,
				userId
			}
		})
	}
}

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

export const updateUserResult = async (
	riderResult: RiderResultIncoming,
	userId: number
) => {
	const existing = await prisma.userResult.findFirst({
		where: {
			gpId: riderResult.gpId,
			userId
		}
	})

	if (existing) {
		await prisma.userResult.update({
			where: {
				id: existing.id
			},
			data: {
				m1: riderResult.m1,
				m2: riderResult.m2,
				m3: riderResult.m3,
				points: existing.points + riderResult.points,
				races: existing.races + riderResult.races
			}
		})
	} else {
		const data: UserResultNew = {
			userId,
			gpId: riderResult.gpId,
			points: riderResult.points,
			races: riderResult.races
		}

		await prisma.userResult.create({ data })
	}
}

export const updateUserResults = async (
	riderResult: RiderResultIncoming,
	year: number
) => {
	const userPicks = await prisma.userPick.findMany({
		where: {
			gpId: riderResult.gpId,
			OR: [
				{ pick1Id: riderResult.riderId },
				{ pick2Id: riderResult.riderId },
				{ pick3Id: riderResult.riderId }
			]
		}
	})

	userPicks.forEach((userPick) => {
		updateUserResult(riderResult, userPick.userId)
		updateUserStanding(riderResult, userPick.userId, year)
	})
}

export const updateUserResultPos = async (id: number, pos: number) => {
	await prisma.userResult.update({
		where: { id },
		data: { pos }
	})
}

export const sortUserResults = async (gpId: number) => {
	const userResults = await prisma.userResult.findMany({
		where: { gpId },
		orderBy: [
			{
				points: 'desc'
			},
			{ m1: 'desc' },
			{ m2: 'desc' },
			{ m3: 'desc' },
			{ races: 'desc' }
		]
	})

	let pos = 1
	let prev: number[] = []

	userResults.forEach((userResult, index) => {
		const current = [
			userResult.points,
			userResult.m1,
			userResult.m2,
			userResult.m3,
			userResult.races
		]

		if (!isIdentical(prev, current)) pos = index + 1

		prev = [...current]

		updateUserResultPos(userResult.id, pos)
	})
}
