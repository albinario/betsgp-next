import type { nation, rider, riderResult } from '@prisma/client'

export type Rider = rider & {
	nation: nation
}

export type RiderNew = Omit<rider, 'id'>

export type PickedRider = Rider & {
	riderResults: riderResult[]
}

export type RiderResultIncoming = Omit<riderResult, 'id'>
