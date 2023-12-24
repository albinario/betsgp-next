import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	request: NextRequest,
	context: {
		params: {
			uid: string
		}
	}
) {
	const user = await prisma.user.findUnique({
		where: {
			uid: context.params.uid
		}
	})
	return NextResponse.json(user)
}
