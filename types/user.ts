import { user, userStanding } from '@prisma/client'

export type UserStanding = userStanding & {
	user: user
}

export type UserStar = {
	userId: number
	year: number
	type: number
	user: user
}
