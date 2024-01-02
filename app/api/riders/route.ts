import { NextRequest, NextResponse } from 'next/server'
import { getRiderResults } from '@/prisma/service'

export async function GET(req: NextRequest) {
	const riders = await getRiderResults(2023)

	return NextResponse.json(riders)
}

// export async function POST(req: NextRequest) {
// 	const data = await req.json()
// 	await prisma.user.create({ data })

// 	return new NextResponse('User created', {})
// }
