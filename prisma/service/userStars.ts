'use server'
import prisma from '@/prisma/client'

export const getUserStars = async () => {
	return await prisma.userStar.findMany()
}
