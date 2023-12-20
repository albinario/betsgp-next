import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRouteAuth({
	children
}: {
	children: React.ReactNode
}) {
	const { userAuth } = useAuth()

	useEffect(() => {
		if (!userAuth) {
			redirect('/')
		}
	}, [userAuth])

	return <>{userAuth ? children : null}</>
}
