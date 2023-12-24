import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../prisma/client'

export async function GET(req: NextRequest) {
	const nations = await prisma.nation.findMany()
	return NextResponse.json(nations)
}

// export async function POST(req: NextRequest) {
// 	const data = await req.json()
// 	await prisma.user.create({ data })

// 	return new NextResponse('User created', {})
// }
