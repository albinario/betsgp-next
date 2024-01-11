import type { gp } from '@prisma/client'
import type { City } from './city'
import { Rider } from './rider'

export type GP = gp & {
	city: City
	wildCard: Rider | null
}

export type GPNew = Omit<gp, 'id' | 'finished' | 'wildCardId'>
