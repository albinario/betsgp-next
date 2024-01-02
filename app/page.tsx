import { getUser } from '@/prisma/service'
import { readSession } from '@/supabase/service'

export default async function Home() {
	const session = await readSession()

	const user = session.data.session?.user

	const userDetails = await getUser(user?.id)

	return userDetails ? (
		<span>
			{userDetails.firstName} {userDetails.lastName}
		</span>
	) : (
		<span>OUT</span>
	)
}
