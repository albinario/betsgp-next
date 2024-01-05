import type { nation, rider, riderResult, userPick } from '@prisma/client'

export type Rider = rider & {
	nation: nation
}

export type RiderResult = riderResult & {
	rider: Rider & {
		pick1s: userPick[]
		pick2s: userPick[]
		pick3s: userPick[]
	}
}
