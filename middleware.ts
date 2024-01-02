import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { readSession, readUser } from './supabase/service'

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (pathname.startsWith('/admin')) {
		const session = await readSession()

		if (!session.data.session?.user.user_metadata.admin) {
			return NextResponse.redirect(new URL('/', req.url))
		}
	}

	if (pathname.startsWith('/api') && req.method === 'POST') {
		try {
			const authHeader = req.headers.get('Authorization')
			if (!authHeader) throw new Error('No auth header')

			const [authSchema, token] = authHeader.split(' ')
			if (authSchema.toLowerCase() !== 'bearer')
				throw new Error('Auth is not bearer')

			const { data, error } = await readUser(token)
			if (error) throw error
			if (!data.user) throw new Error('User not found')
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

	return NextResponse.next()
}
