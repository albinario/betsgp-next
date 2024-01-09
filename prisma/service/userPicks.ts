'use server'
import prisma from '@/prisma/client'

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
