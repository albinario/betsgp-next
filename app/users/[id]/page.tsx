import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import GPCardHeader from '@/components/gp/CardHeader'
import GPParticipants from '@/components/gp/Participants'
import Medals from '@/components/Medals'
import UserPicks from '@/components/user/Picks'
import { participants, rounds } from '@/data'
import { Star } from '@/icons'
import { getUser } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function User({ params }: { params: { id: string } }) {
	const year = 2023
	const user = await getUser(Number(params.id), year)
	const gpsAmount = user ? user.userResults.length : 0

	return user ? (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				<Col>
					<Card>
						<CardHeader className='d-flex align-items-center justify-content-center gap-1'>
							{user.firstName} {user.lastName}
							{user.userStars.map((star) => (
								<Star key={star.id} type={star.type} width={16} />
							))}
						</CardHeader>
						<CardBody className='p-2'>
							<CardBodyRow
								title={'Position'}
								value={`${user.userStandings[0].pos} / ${participants[year]}`}
							/>
							<CardBodyRow
								title={'Total points'}
								value={user.userStandings[0].points}
							/>
							<Medals
								medals={[
									user.userStandings[0].m1,
									user.userStandings[0].m2,
									user.userStandings[0].m3
								]}
							/>
							<CardBodyRow title={`GP's`} value={gpsAmount} />
							<CardBodyRow
								title={'Average per GP'}
								value={(user.userStandings[0].points / gpsAmount).toFixed(2)}
							/>
							<CardBodyRow
								title={'Average per rider'}
								value={(user.userStandings[0].points / gpsAmount / 3).toFixed(
									2
								)}
							/>
							<CardBodyRow
								title={'Finished races'}
								value={user.userStandings[0].races}
							/>
						</CardBody>
					</Card>
				</Col>

				{user.userResults.map((res) => {
					return (
						<Col key={res.gpId}>
							<Card>
								<GPCardHeader
									cityId={res.gp.cityId}
									cityName={res.gp.city.name}
									nationCode={res.gp.city.nation.code}
									dateTime={res.gp.dateTime}
									round={res.gp.gp}
									rounds={rounds[year]}
								/>

								<CardBody className='p-2'>
									{/* @ts-expect-error Server Component */}
									<UserPicks gpId={res.gpId} userId={res.userId} />

									<div className='mt-2'>
										<CardBodyRow title={'Points'} value={res.points} />
										<CardBodyRow title={'Races'} value={res.races} />
										<span className='d-flex justify-content-between'>
											<span>Position</span>
											<span>
												{res.pos} / {/* @ts-expect-error Server Component */}
												<GPParticipants gpId={res.gpId} />
											</span>
										</span>
									</div>
								</CardBody>
							</Card>
						</Col>
					)
				})}
			</Row>
		</AnimationWrapper>
	) : (
		<></>
	)
}
