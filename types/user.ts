import { user, userStanding } from '@prisma/client'

export type UserStanding = userStanding & {
	user: user
}
