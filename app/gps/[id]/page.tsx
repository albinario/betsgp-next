import GPCardHeader from '@/components/GPCardHeader'
import RidersResults from './RidersResults'
import UsersResults from './UsersResults'
import { getGp } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function GP({ params }: { params: { id: string } }) {
	const gp = await getGp(Number(params.id))

	return gp ? (
		<>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2 mb-2'>
				<Col>
					<Card>
						<GPCardHeader
							cityId={gp.cityId}
							cityName={gp.city.name}
							nationCode={gp.city.nation.code}
							dateTime={gp.dateTime}
							round={gp.gp}
							rounds={10}
						/>
						<CardBody className='p-2'>Some information about the GP</CardBody>
					</Card>
				</Col>
			</Row>
			<Row xs={1} lg={2} className='g-2'>
				{/* @ts-expect-error Server Component */}
				<UsersResults usersResults={gp.userResults} />
				{/* @ts-expect-error Server Component */}
				<RidersResults ridersResults={gp.riderResults} />
			</Row>
		</>
	) : (
		<div>Loading GP...</div>
	)
}
