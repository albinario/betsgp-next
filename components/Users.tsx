import AnimationWrapper from './AnimationWrapper'
import prisma from '@/lib/prismaClient'

export default async function Users() {
	const users = await prisma.user.findMany()

	return (
		<AnimationWrapper>
			{users?.map((user) => (
				<div key={user.uid}>
					{user.firstName} {user.lastName}, {user.email}, ({user.uid})
				</div>
			))}
		</AnimationWrapper>
	)
}
