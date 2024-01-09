import type { gp } from '@prisma/client'
import type { City } from './city'

export type GP = gp & {
	city: City
}

export type GPNew = Omit<gp, 'id' | 'finished' | 'wildCardId'>
