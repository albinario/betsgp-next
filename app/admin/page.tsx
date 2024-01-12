import AddCity from './AddCity'
import AddGP from './AddGP'
import AddNation from './AddNation'
import AnimationWrapper from '@/components/AnimationWrapper'
import {
	getCities,
	getGpsNoWildCard,
	getNations,
	getRidersNotActive
} from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AddRider from './AddRider'
import AssignWildCard from './AssignWildCard'

export default async function Admin() {
	const cities = await getCities()
	const gps = await getGpsNoWildCard()
	const nations = await getNations()
	const riders = await getRidersNotActive()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				<Col>
					<AssignWildCard gps={gps} riders={riders} />
				</Col>
				<Col>
					<AddRider nations={nations} />
				</Col>
				<Col>
					<AddGP cities={cities} />
				</Col>
				<Col>
					<AddCity nations={nations} />
				</Col>
				<Col>
					<AddNation />
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
