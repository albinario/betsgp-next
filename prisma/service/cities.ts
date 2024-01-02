'use server'
import prisma from '@/prisma/client'
import type { CityNew } from '@/types/Data.types'

export const createCity = async (data: CityNew) => {
	await prisma.city.create({ data })
}