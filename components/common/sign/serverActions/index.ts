'use server'
import createSupabaseServerClient from '@/supabase/serverClient'
import { ResetPassword, SignIn, SignUp } from '@/types/Auth.types'

export async function resetPassword(data: ResetPassword) {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.resetPasswordForEmail(data.email)

	if (result.error) throw new Error()
}

export async function signUpWithEmailAndPassword(data: SignUp) {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.signUp({
		email: data.email,
		password: data.password
	})

	if (result.error) throw new Error()

	return result.data.user?.id
}

export async function signInWithEmailAndPassword(data: SignIn) {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password
	})

	console.log(result.data.user)

	if (result.error) throw new Error()

	return result.data.user.id
}

export async function signOutUser() {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.signOut()

	if (result.error) throw new Error()
}
