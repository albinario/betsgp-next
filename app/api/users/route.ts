import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../lib/prismaClient'

export async function GET(req: NextRequest) {
	const users = await prisma.user.findMany()

	return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
	console.log('herrrrro')

	const data = await req.json()
	await prisma.user.create({ data })

	return new NextResponse('User created', {})
}
