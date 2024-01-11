'use server'
import prisma from '@/prisma/client'

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

export const getRiderStandings = async (year = 0) => {
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
