import AnimationWrapper from '@/components/AnimationWrapper'
import GPCardHeader from '@/components/GPCardHeader'
import Link from 'next/link'
import { getGps } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Riders() {
	const gps = await getGps(2023)
	const gpsTotal = gps.length

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				{gps.map((gp) => (
					<Col key={gp.id}>
						<Link href={'gps/' + gp.id}>
							<Card>
								<GPCardHeader
									cityId={gp.cityId}
									cityName={gp.city.name}
									nationCode={gp.city.nation.code}
									dateTime={gp.dateTime}
									round={gp.gp}
									rounds={gpsTotal}
								/>
								<CardBody>
									{/* {gp.users_results && moment.utc(gp.dateTime) < moment.utc() && (
									<UsersResultsTable users={gp.users_results.slice(0,3)} />
								)} */}

									{/* {moment.utc(gp.dateTime) > moment.utc() && (
									<>
									<ActivityTable activity={gp.activity} showCity={false} />
									
									<Card.Text className='text-center'>
									{next && <Countdown dateTime={gp.dateTime} />}
									</Card.Text>
									</>
								)} */}
								</CardBody>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</AnimationWrapper>
	)
}
