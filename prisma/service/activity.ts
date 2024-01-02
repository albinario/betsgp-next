'use server'
import prisma from '@/prisma/client'

export const getActivity = async () => {
	await prisma.activity.findMany()
}
