'use server'
import prisma from '@/prisma/client'

export const getActivity = async () => {
	return await prisma.activity.findMany({
		include: {
			user: {
				select: {
					firstName: true,
					lastName: true
				}
			},
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
			id: 'desc'
		},
		take: 100
	})
}
