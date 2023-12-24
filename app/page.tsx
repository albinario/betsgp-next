import { getUser } from '@/hooks/useUsers'
import readUserSession from '@/supabase/actions'

export default async function Home() {
	const session = await readUserSession()

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
