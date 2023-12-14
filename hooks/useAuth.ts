import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export default function useAuth() {
	const authContext = useContext(AuthContext)

	if (!authContext) {
		throw new Error('Trying to use AuthContext outside of AuthContextProvider')
	}

	return authContext
}
