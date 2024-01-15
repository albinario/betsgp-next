import { NextRequest, NextResponse } from 'next/server'
import { getGpsFinished } from '@/prisma/service'

export async function GET(req: NextRequest) {
	const res = await getGpsFinished(2023)

	return NextResponse.json(res)
}
