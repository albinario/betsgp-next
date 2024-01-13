'use server'
import { cookies } from 'next/headers'

export const getCookieYear = async () => {
	const cookieStore = cookies()
	const year = cookieStore.get('year')?.value
	return year ? Number(year) : undefined
}

export const setCookieYear = async (year: number) => {
	const cookieStore = cookies()
	const yearStr = String(year)
	cookieStore.set('year', yearStr)
}
