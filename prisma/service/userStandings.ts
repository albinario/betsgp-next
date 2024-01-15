'use server'
import { isIdentical } from '@/helpers/array'
import { getCurrentYear } from '@/helpers/dateTime'
import prisma from '@/prisma/client'
import type { RiderResultIncoming, UserStandingNew } from '@/types'

export const getUserStandings = async (year = getCurrentYear()) => {
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

export const setUserStandingsPrevPos = async (year: number) => {
	const userStandings = await prisma.userStanding.findMany({
		where: { year }
	})
	userStandings.forEach((userStanding) => {
		if (userStanding.pos)
			updateUserStandingPrevPos(userStanding.id, userStanding.pos)
	})
}

export const updateUserStandingPrevPos = async (id: number, pos: number) => {
	await prisma.userStanding.update({
		where: { id },
		data: { prevPos: pos }
	})
}

export const sortUserStandings = async (year: number) => {
	const userStandings = await prisma.userStanding.findMany({
		where: { year },
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

	userStandings.forEach((userStanding, index) => {
		const current = [
			userStanding.points,
			userStanding.m1,
			userStanding.m2,
			userStanding.m3,
			userStanding.races
		]

		if (!isIdentical(prev, current)) pos = index + 1

		prev = [...current]

		updateUserStandingPos(userStanding.id, pos)
	})
}

export const updateUserStandingPos = async (id: number, pos: number) => {
	await prisma.userStanding.update({
		where: { id },
		data: { pos }
	})
}

export const updateUserStanding = async (
	riderResult: RiderResultIncoming,
	userId: number,
	year: number
) => {
	const existing = await prisma.userStanding.findFirst({
		where: {
			userId,
			year
		}
	})

	if (existing) {
		await prisma.userStanding.update({
			where: {
				id: existing.id
			},
			data: {
				m1: existing.m1 + riderResult.m1,
				m2: existing.m2 + riderResult.m2,
				m3: existing.m3 + riderResult.m3,
				points: existing.points + riderResult.points,
				races: existing.races + riderResult.races
			}
		})
	} else {
		const data: UserStandingNew = {
			userId,
			year,
			points: riderResult.points,
			races: riderResult.races
		}

		await prisma.userStanding.create({ data })
	}
}
