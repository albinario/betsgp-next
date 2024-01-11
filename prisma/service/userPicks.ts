'use server'
import prisma from '@/prisma/client'
import type { UserPickAdd } from '@/types'

export const addUserPick = async (data: UserPickAdd) => {
	const exists = await prisma.userPick.findFirst({
		where: {
			gpId: data.gpId,
			userId: data.userId
		}
	})
	if (!exists) {
		await prisma.userPick.create({ data })
	} else {
		await prisma.userPick.update({
			where: {
				id: exists.id
			},
			data: {
				pick1Id: data.pick1Id,
				pick2Id: data.pick2Id,
				pick3Id: data.pick3Id
			}
		})
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
