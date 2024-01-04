import { city, nation } from '@prisma/client'

export type City = city & {
	nation: nation
}

export type CityNew = Omit<city, 'id'>
