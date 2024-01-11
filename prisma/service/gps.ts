'use server'
import prisma from '@/prisma/client'
import type { GPNew } from '@/types'

export const assignWildCard = async (id: number, riderId: number) => {
	await prisma.gp.update({
		where: {
			id
		},
		data: {
			wildCardId: riderId
		}
	})
}

export const createGP = async (data: GPNew) => {
	await prisma.gp.create({ data })
}

export const getGp = async (id: number) => {
	return await prisma.gp.findUnique({
		where: {
			id
		},
		include: {
			// activity: {
			// 	include: {
			// 		user: {
			// 			select: {
			// 				id: true,
			// 				firstName: true,
			// 				lastName: true
			// 			}
			// 		}
			// 	},
			// 	orderBy: {
			// 		id: 'desc'
			// 	}
			// },
			city: {
				include: {
					nation: true
				}
			},
			wildCard: {
				include: {
					nation: true
				}
			}
		}
	})
}

export const getGpLatest = async () => {
	return await prisma.gp.findFirst({
		where: {
			userResults: {
				some: {}
			}
		},
		include: {
			city: {
				include: {
					nation: true
				}
			}
		},
		orderBy: {
			id: 'desc'
		}
	})
}

export const getGps = async (year: number) => {
	return await prisma.gp.findMany({
		where: year
			? {
					dateTime: {
						gte: new Date(`${year}-01-01`),
						lte: new Date(`${year}-12-31`)
					}
			  }
			: undefined,
		include: {
			activity: {
				include: {
					user: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							userStars: true
						}
					}
				},
				orderBy: {
					id: 'desc'
				},
				take: 5
			},
			city: {
				include: {
					nation: true
				}
			},
			userResults: {
				include: {
					user: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							userStars: true
						}
					}
				},
				orderBy: {
					pos: 'asc'
				},
				take: 3
			}
		}
	})
}

export const getGpsNoWildCard = async () => {
	return await prisma.gp.findMany({
		where: {
			wildCardId: null
		},
		include: {
			city: true
		}
	})
}

export const getGpParticipants = async (gpId: number) => {
	return await prisma.userPick.count({
		where: {
			gpId
		}
	})
}

export const getGpsUpcoming = async () => {
	return await prisma.gp.findMany({
		where: {
			finished: false
		},
		include: {
			city: {
				include: {
					nation: true
				}
			},
			wildCard: {
				include: {
					nation: true
				}
			}
		}
	})
}
