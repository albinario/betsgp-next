import AnimationWrapper from '@/components/AnimationWrapper'
import Flag from '@/components/Flag'
import getLocalDateTime from '@/helpers/getDateTime'
import Link from 'next/link'
import { getGps } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardImg from 'react-bootstrap/CardImg'
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
								<CardImg src={`/cities/${gp.city.id}.jpg`} variant='top' />
								<div className='position-absolute p-2 w-100'>
									<div className='d-flex align-items-center justify-content-between'>
										<span className='overlay-text'>{gp.city.name}</span>
										<Flag height={'1.5em'} nationCode={gp.city.nation.code} />
									</div>

									<span className='small overlay-text'>
										{getLocalDateTime(gp.dateTime)}
									</span>

									<span className='small overlay-text'>
										Round {gp.gp} of {gpsTotal}
									</span>

									<span className='small overlay-text'>
										{gp.usersResults.length} placed bets
									</span>
								</div>

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
