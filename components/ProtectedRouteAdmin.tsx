import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedRouteAdmin({
	children
}: {
	children: React.ReactNode
}) {
	const { user } = useAuth()

	useEffect(() => {
		if (!user?.admin) {
			redirect('/')
		}
	}, [user])

	return <>{user?.admin ? children : null}</>
}
