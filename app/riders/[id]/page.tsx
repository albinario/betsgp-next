import { getRider } from '@/prisma/service'

type Params = {
	params: { id: string }
}

export default async function Rider({ params }: Params) {
	const rider = await getRider(Number(params.id))
	console.log(rider)

	return <div>{rider?.name}</div>
}
