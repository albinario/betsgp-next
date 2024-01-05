import { NextRequest, NextResponse } from 'next/server'
import { getGp } from '@/prisma/service'

export async function GET(req: NextRequest) {
	const res = await getGp(30)

	return NextResponse.json(res)
}
