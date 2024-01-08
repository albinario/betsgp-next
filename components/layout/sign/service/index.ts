'use server'
import { createUser } from '@/prisma/service'
import createSupabaseServerClient from '@/supabase/serverClient'
import type { ResetPassword, SignIn, SignUp, UserNew } from '@/types'

export const resetPassword = async (data: ResetPassword) => {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.resetPasswordForEmail(data.email)

	if (result.error) throw new Error()
}

export const signUpWithEmailAndPassword = async (data: SignUp) => {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.signUp({
		email: data.email,
		password: data.password
	})

	if (result.error || !result.data.user) throw new Error()

	const userNew: UserNew = {
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		uid: result.data.user.id
	}

	await createUser(userNew)
}

export const signInWithEmailAndPassword = async (data: SignIn) => {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password
	})

	if (result.error) throw new Error()
}

export const signOutUser = async () => {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.signOut()

	if (result.error) throw new Error()
}
