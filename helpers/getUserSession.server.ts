import { getUserRaw } from '@/prisma/service'
import { readSession } from '@/supabase/service'

export default async function getUserSession() {
	const session = await readSession()
	const userSession = session.data.session?.user
	return userSession ? await getUserRaw(userSession.id) : null
}
