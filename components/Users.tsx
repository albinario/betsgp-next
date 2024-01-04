import prisma from '@/prisma/client'

export default async function Users() {
	const users = await prisma.user.findMany()

	return (
		<>
			{users?.map((user) => (
				<div key={user.uid}>
					{user.firstName} {user.lastName}, {user.email}, ({user.uid})
				</div>
			))}
		</>
	)
}
