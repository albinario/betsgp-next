'use server'
import createSupabaseServerClient from '@/supabase/serverClient'

export const readSession = async () => {
	const supabase = await createSupabaseServerClient()
	return supabase.auth.getSession()
}

export const readUser = async (token: string) => {
	const supabase = await createSupabaseServerClient()
	return supabase.auth.getUser(token)
}
