'use server'
import { isIdentical } from '@/helpers/array'
import { getCurrentYear } from '@/helpers/dateTime'
import prisma from '@/prisma/client'
import type { RiderResultIncoming } from '@/types'

export const getRiderResults = async (gpId: number) => {
	return await prisma.riderResult.findMany({
		where: {
			gpId
		},
		include: {
			rider: {
				include: {
					nation: true,
					pick1s: {
						where: {
							gpId
						}
					},
					pick2s: {
						where: {
							gpId
						}
					},
					pick3s: {
						where: {
							gpId
						}
					}
				}
			}
		},
		orderBy: [
			{ points: 'desc' },
			{ m1: 'desc' },
			{ m2: 'desc' },
			{ m3: 'desc' },
			{ races: 'desc' }
		]
	})
}

export const getRiderStandings = async (year = getCurrentYear()) => {
	const riderResults = await prisma.riderResult.groupBy({
		by: 'riderId',
		where: year
			? {
					gp: {
						dateTime: {
							gte: new Date(`${year}-01-01`),
							lte: new Date(`${year}-12-31`)
						}
					}
			  }
			: undefined,
		_sum: {
			points: true,
			m1: true,
			m2: true,
			m3: true,
			races: true
		},
		orderBy: [
			{ _sum: { points: 'desc' } },
			{ _sum: { m1: 'desc' } },
			{ _sum: { m2: 'desc' } },
			{ _sum: { m3: 'desc' } },
			{ _sum: { races: 'desc' } }
		]
	})

	const riders = await Promise.all(
		riderResults.map(async (riderResult) => {
			const rider = await prisma.rider.findUnique({
				where: { id: riderResult.riderId },
				include: {
					nation: true,
					pick1s: {
						where: year
							? {
									gp: {
										dateTime: {
											gte: new Date(`${year}-01-01`),
											lte: new Date(`${year}-12-31`)
										}
									}
							  }
							: undefined
					},
					pick2s: {
						where: year
							? {
									gp: {
										dateTime: {
											gte: new Date(`${year}-01-01`),
											lte: new Date(`${year}-12-31`)
										}
									}
							  }
							: undefined
					},
					pick3s: {
						where: year
							? {
									gp: {
										dateTime: {
											gte: new Date(`${year}-01-01`),
											lte: new Date(`${year}-12-31`)
										}
									}
							  }
							: undefined
					}
				}
			})
			return {
				rider,
				...riderResult
			}
		})
	)

	return riders
}

export const updateRiderResult = async (data: RiderResultIncoming) => {
	const existing = await prisma.riderResult.findFirst({
		where: {
			gpId: data.gpId,
			riderId: data.riderId
		}
	})

	if (existing) {
		await prisma.riderResult.update({
			where: {
				id: existing.id
			},
			data: {
				m1: data.m1,
				m2: data.m2,
				m3: data.m3,
				points: existing.points + data.points,
				races: existing.races + data.races
			}
		})
	} else {
		await prisma.riderResult.create({ data })
	}
}

export const updateRiderResultPos = async (id: number, pos: number) => {
	await prisma.riderResult.update({
		where: { id },
		data: { pos }
	})
}

export const sortRiderResults = async (gpId: number) => {
	const riderResults = await prisma.riderResult.findMany({
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

	riderResults.forEach((riderResult, index) => {
		const current = [
			riderResult.points,
			riderResult.m1,
			riderResult.m2,
			riderResult.m3,
			riderResult.races
		]

		if (!isIdentical(prev, current)) pos = index + 1

		prev = [...current]

		updateRiderResultPos(riderResult.id, pos)
	})
}
