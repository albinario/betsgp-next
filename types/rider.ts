import type { nation, rider, riderResult } from '@prisma/client'

export type Rider = rider & {
	nation: nation
}

export type PickedRider = Rider & {
	riderResults: riderResult[]
}
