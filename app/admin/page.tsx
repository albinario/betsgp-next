import AnimationWrapper from '@/components/AnimationWrapper'
import Row from 'react-bootstrap/Row'
import AddCity from './AddCity'
import { readSession } from '@/supabase/actions'
import prisma from '@/prisma/client'
import AddNation from './AddNation'

export default async function Admin() {
	const session = await readSession()
	const token = session.data.session?.access_token

	const nations = await prisma.nation.findMany()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className='gap-0'>
				<AddCity nations={nations} token={token} />
				<AddNation token={token} />
			</Row>
		</AnimationWrapper>
	)
}
