import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createSupabaseServerClient from './supabase/serverClient'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/admin')) {
		const userIsAuthenticated = await isAuthenticated(request)

		if (!userIsAuthenticated) {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}

	return NextResponse.next()
}

async function isAuthenticated(request: NextRequest) {
	const supabase = await createSupabaseServerClient()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	return user?.user_metadata.admin ? true : false
}
