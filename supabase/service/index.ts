'use server'
import createSupabaseServerClient from '@/supabase/serverClient'

export async function readSession() {
	const supabase = await createSupabaseServerClient()
	return supabase.auth.getSession()
}

export async function readUser(token: string) {
	const supabase = await createSupabaseServerClient()
	return supabase.auth.getUser(token)
}
