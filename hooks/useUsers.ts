import { useEffect, useState } from 'react'
import { User } from '@/types/User.types'

export default function useUsers() {
	const [users, setUsers] = useState<User[] | null>(null)

	useEffect(() => {
		const getUsers = async () => {
			const query = await fetch('api/users')
			const res = await query.json()
			setUsers(res)
		}
		getUsers()
	}, [])

	return users
}
