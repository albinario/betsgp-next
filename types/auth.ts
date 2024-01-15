export type Form = 'in' | 'reset' | 'up'

export type ResetPassword = {
	email: string
}

export type SignIn = {
	email: string
	password: string
}

export type SignUp = {
	email: string
	firstName: string
	lastName: string
	password: string
}

export type UpdatePassword = {
	passwordNew: string
}
