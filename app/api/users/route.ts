import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../prisma/client'
import { getUsers } from '@/hooks/useUsers'

export async function GET(req: NextRequest) {
	const users = getUsers()

	return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
	const data = await req.json()
	await prisma.user.create({ data })

	return new NextResponse('User created', {})
}
