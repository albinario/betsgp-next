import type { nation, rider, riderResult, userPick } from '@prisma/client'

export type Rider = rider & {
	nation: nation
}
