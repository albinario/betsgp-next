'use server'
import prisma from '@/prisma/client'
import { createUserResult } from '@/prisma/service//userResults'
import { createUserStanding } from '@/prisma/service/userStandings'
import type { UserPickAdd } from '@/types'

export const addUserPick = async (data: UserPickAdd, year: number) => {
	const existing = await prisma.userPick.findFirst({
		where: {
			gpId: data.gpId,
			userId: data.userId
		}
	})

	if (existing) {
		await prisma.userPick.update({
			where: {
				id: existing.id
			},
			data: {
				pick1Id: data.pick1Id,
				pick2Id: data.pick2Id,
				pick3Id: data.pick3Id
			}
		})

		await prisma.activity.create({
			data: {
				creation: false,
				gpId: data.gpId,
				userId: data.userId
			}
		})
	} else {
		await prisma.userPick.create({ data })

		await prisma.activity.create({
			data: {
				gpId: data.gpId,
				userId: data.userId
			}
		})

		await createUserResult(data.gpId, data.userId)
		await createUserStanding(data.userId, year)
	}
}

export const getUserPicks = async (gpId: number, userId: number) => {
	return await prisma.userPick.findFirst({
		where: {
			gpId,
			userId
		},
		include: {
			pick1: {
				include: {
					nation: true,
					riderResults: {
						where: {
							gpId
						}
					}
				}
			},
			pick2: {
				include: {
					nation: true,
					riderResults: {
						where: {
							gpId
						}
					}
				}
			},
			pick3: {
				include: {
					nation: true,
					riderResults: {
						where: {
							gpId
						}
					}
				}
			}
		}
	})
}

export const getUserPick = async (gpId: number, userId: number) => {
	return await prisma.userPick.findFirst({
		where: {
			gpId,
			userId
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
	})
}
