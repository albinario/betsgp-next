'use server'
import prisma from '@/prisma/client'

export const getUserStandings = async () => {
	return await prisma.userStanding.findMany()
}
