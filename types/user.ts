import type {
	userPick,
	userResult,
	userStanding,
	userStar
} from '@prisma/client'
import type { Rider } from './rider'

export type User = {
	id: number
	firstName: string
	lastName: string
	userPicks: UserPick[]
	userStars: userStar[]
}

export type UserResult = userResult & {
	user: User
}

export type UserStanding = userStanding & {
	user: User
}

export type UserPick = userPick & {
	pick1: Rider
	pick2: Rider
	pick3: Rider
}
