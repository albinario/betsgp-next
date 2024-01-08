import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET(req: NextRequest) {
	const cities = await prisma.city.findMany()

	return NextResponse.json(cities)
}

export async function POST(req: NextRequest) {
	const data = await req.json()

	await prisma.city.create({ data })

	return new NextResponse('City added')
}
