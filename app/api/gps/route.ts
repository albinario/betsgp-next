import { NextRequest, NextResponse } from 'next/server'
import { getGps } from '@/prisma/service'

export async function GET(req: NextRequest) {
	const res = await getGps(2023)

	return NextResponse.json(res)
}
