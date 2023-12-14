'use client'
import AnimationWrapper from './AnimationWrapper'
import useUsers from '@/hooks/useUsers'

export default function Users() {
	const users = useUsers()

	return (
		<AnimationWrapper>
			<div>{users?.map((user) => user.name)}</div>
		</AnimationWrapper>
	)
}
