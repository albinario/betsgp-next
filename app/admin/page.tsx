import AnimationWrapper from '@/components/AnimationWrapper'
import Row from 'react-bootstrap/Row'
import AddCity from './AddCity'
import AddNation from './AddNation'
import { getNations } from '@/prisma/service'

export default async function Admin() {
	const nations = await getNations()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className='g-2'>
				<AddCity nations={nations} />
				<AddNation />
			</Row>
		</AnimationWrapper>
	)
}
