import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(req: NextRequest) {
	const data = await prisma.nation.findMany()

	return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
	const data = await req.json()

	await prisma.nation.create({ data })

	return new NextResponse('Nation created')
}
