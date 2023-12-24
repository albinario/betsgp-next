'use server'
import createSupabaseServerClient from '../serverClient'

export default async function readUserSession() {
	const supabase = await createSupabaseServerClient()
	return supabase.auth.getSession()
}
