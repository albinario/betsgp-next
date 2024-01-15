import AddCity from '@/components/admin/AddCity'
import AddGP from '@/components/admin/AddGP'
import AddNation from '@/components/admin/AddNation'
import AddRider from '@/components/admin/AddRider'
import AnimationWrapper from '@/components/AnimationWrapper'
import AssignWildCard from '@/components/admin/AssignWildCard'
import {
	getCities,
	getGpsUpcoming,
	getNations,
	getRidersNotActive
} from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Admin() {
	const cities = await getCities()
	const gps = await getGpsUpcoming()
	const nations = await getNations()
	const ridersNotActive = await getRidersNotActive()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} className='g-2'>
				<Col>
					<AssignWildCard gps={gps} riders={ridersNotActive} />
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
