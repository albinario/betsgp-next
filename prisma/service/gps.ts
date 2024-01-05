'use server'
import prisma from '@/prisma/client'

export const getGp = async (id: number) => {
	return await prisma.gp.findUnique({
		where: {
			id
		},
		include: {
			activity: {
				include: {
					user: {
						select: {
							id: true,
							firstName: true,
							lastName: true
						}
					}
				},
				orderBy: {
					id: 'desc'
				}
			},
			city: {
				include: {
					nation: true
				}
			},
			riderResults: {
				include: {
					rider: {
						include: {
							nation: true,
							pick1s: {
								where: {
									gpId: id
								}
							},
							pick2s: {
								where: {
									gpId: id
								}
							},
							pick3s: {
								where: {
									gpId: id
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
			},
			userResults: {
				include: {
					user: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							userStars: true,
							userPicks: {
								where: {
									gpId: id
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
			}
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
				}
			}
		}
	})
}
