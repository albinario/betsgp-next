import type { gp } from '@prisma/client'
import type { City } from './city'
import type { UserPick } from './user'

export type GP = gp & {
	city: City
	userPicks: UserPick[]
}
