import type {
	user,
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

export type UserNew = {
	firstName: string
	lastName: string
	email: string
	uid: string
}

export type UserPick = userPick & {
	pick1: Rider
	pick2: Rider
	pick3: Rider
}

export type UserPickAdd = Omit<userPick, 'id' | 'created' | 'updated'>

export type UserResultIncoming = Omit<userResult, 'id' | 'pos'>

export type UserStanding = userStanding & {
	user: user
}
