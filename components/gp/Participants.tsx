import { getGpParticipants } from '@/prisma/service'

export default async function GPParticipants({ gpId }: { gpId: number }) {
	const gpParticipants = await getGpParticipants(gpId)

	return <>{gpParticipants}</>
}
