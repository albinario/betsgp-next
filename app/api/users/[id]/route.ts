import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../prismaClient'

export async function GET(request: NextRequest) {
	const users = await prisma.users.findMany()
	console.log(request.nextUrl.searchParams.get('sort'))

	return NextResponse.json(users)
}
