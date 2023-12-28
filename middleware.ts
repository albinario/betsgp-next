import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import readUserSession from './supabase/actions'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/admin')) {
		const userSession = await readUserSession()

		if (!userSession.data.session?.user.user_metadata.admin) {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}

	return NextResponse.next()
}
