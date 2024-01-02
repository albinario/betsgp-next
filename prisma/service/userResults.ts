'use server'
import prisma from '@/prisma/client'

export const getUserResults = async () => {
	return await prisma.userResult.findMany()
}
