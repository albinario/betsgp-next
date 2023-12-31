import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../prisma/client'
import { readUser } from '@/supabase/actions'

export async function GET(req: NextRequest) {
	const cities = await prisma.city.findMany()

	return NextResponse.json(cities)
}

export async function POST(req: NextRequest) {
	try {
		const authHeader = req.headers.get('Authorization')
		if (!authHeader) throw new Error('No auth header')

		const [authSchema, token] = authHeader.split(' ')
		if (authSchema.toLowerCase() !== 'bearer')
			throw new Error('Auth is not bearer')

		const { data, error } = await readUser(token)
		if (error) throw error
		if (!data.user) throw new Error('User not found')

		const newData = await req.json()
		await prisma.city.create({ data: newData })

		return NextResponse.json(data.user)
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				status: 'fail',
				data: 'Authorization required'
			}),
			{
				status: 401,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}
}
