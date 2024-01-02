'use server'
import prisma from '@/prisma/client'

export const getUserPicks = async () => {
	return await prisma.userPick.findMany()
}
