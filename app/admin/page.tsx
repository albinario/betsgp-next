import AddCity from './AddCity'
import AddGP from './AddGP'
import AddNation from './AddNation'
import AnimationWrapper from '@/components/AnimationWrapper'
import { getCities, getNations } from '@/prisma/service'
import Row from 'react-bootstrap/Row'

export default async function Admin() {
	const cities = await getCities()
	const nations = await getNations()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} md={3} lg={4} xl={5} className='g-2'>
				<AddGP cities={cities} />
				<AddCity nations={nations} />
				<AddNation />
			</Row>
		</AnimationWrapper>
	)
}
