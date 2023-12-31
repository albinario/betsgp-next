import AnimationWrapper from '@/components/AnimationWrapper'
import Row from 'react-bootstrap/Row'
import AddCity from './AddCity'
import { readSession } from '@/supabase/actions'
import prisma from '@/prisma/client'

export default async function Admin() {
	const nations = await prisma.nation.findMany()
	const session = await readSession()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className='gap-2'>
				<AddCity nations={nations} token={session.data.session?.access_token} />
			</Row>
		</AnimationWrapper>
	)
}
