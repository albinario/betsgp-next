import {
	user,
	userPick,
	userResult,
	userStanding,
	userStar
} from '@prisma/client'

export type User = user & {
	userPicks: userPick[]
	userStars: userStar[]
}

export type UserResult = userResult & {
	user: User
}

export type UserStanding = userStanding & {
	user: User
}
