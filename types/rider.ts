import { nation, pick, rider, riderResult } from '@prisma/client'

export type Rider = rider & {
	nation: nation
	picks: pick[]
}

export type RiderResult = riderResult & {
	rider: Rider
}
