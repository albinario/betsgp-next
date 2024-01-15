'use server'
import { createUser } from '@/prisma/service'
import createSupabaseServerClient from '@/supabase/serverClient'
import { metadata } from '@/theme'
import type {
	ResetPassword,
	SignIn,
	SignUp,
	UpdatePassword,
	UserNew
} from '@/types'

export const readSession = async () => {
	const supabase = await createSupabaseServerClient()
	return supabase.auth.getSession()
}

export const readUser = async (token: string) => {
	const supabase = await createSupabaseServerClient()
	return supabase.auth.getUser(token)
}

export const resetPassword = async (data: ResetPassword) => {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.resetPasswordForEmail(data.email, {
		redirectTo: metadata.websiteUrl + '/users/update-password'
	})

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

export const updatePassword = async (data: UpdatePassword) => {
	const supabase = await createSupabaseServerClient()

	const result = await supabase.auth.updateUser({ password: data.passwordNew })

	if (result.error) throw new Error()
}
