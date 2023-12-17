export type User = {
	admin: boolean
	email: string
	firstName: string
	lastName: string
	registered: Date
}

export type UserStar = {
	userId: number
	year: number
	type: number
	user: User
}
