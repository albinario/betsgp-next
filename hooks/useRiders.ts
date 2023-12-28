import prisma from '@/prisma/client'

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

export const getRidersResults = async (year = 0) => {
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
			{
				_sum: {
					points: 'desc'
				}
			},
			{
				_sum: {
					m1: 'desc'
				}
			},
			{
				_sum: {
					m2: 'desc'
				}
			},
			{
				_sum: {
					m3: 'desc'
				}
			},
			{
				_sum: {
					races: 'desc'
				}
			}
		]
	})

	const riders = await Promise.all(
		riderResults.map(async (result) => {
			const rider = await prisma.rider.findUnique({
				where: { id: result.riderId },
				include: {
					nation: true,
					picks: true
				}
			})
			return {
				rider,
				...result
			}
		})
	)

	return riders
}
