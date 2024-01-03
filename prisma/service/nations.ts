'use server'
import prisma from '@/prisma/client'
import type { NationNew } from '@/types'

export const createNation = async (data: NationNew) => {
	await prisma.nation.create({ data })
}

export const getNations = async () => {
	return await prisma.nation.findMany()
}
