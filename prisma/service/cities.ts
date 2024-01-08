'use server'
import prisma from '@/prisma/client'
import type { CityNew } from '@/types'

export const createCity = async (data: CityNew) => {
	await prisma.city.create({ data })
}

export const getCities = async () => {
	return await prisma.city.findMany()
}
