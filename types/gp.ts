import { gp, userPick } from '@prisma/client'
import { City } from './city'

export type GP = gp & {
	city: City
	userPicks: userPick[]
}
