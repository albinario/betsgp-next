import classNames from 'classnames'
import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import GPCardHeader from '@/components/gp/CardHeader'
import GPParticipants from '@/components/gp/Participants'
import GPsUpcoming from '@/components/gp/Upcoming'
import SignOut from '@/components/layout/sign/Out'
import Medals from '@/components/Medals'
import MoreButton from '@/components/MoreButton'
import Stars from '@/components/Stars'
import UserPicks from '@/components/user/Picks'
import { getCookieYear } from '@/cookies/service'
import { participants, rounds } from '@/data'
import { getCurrentYear } from '@/helpers/dateTime'
import getUserSession from '@/helpers/userSession.server'
import { getUser } from '@/prisma/service'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function UserPage({ params }: { params: { id: string } }) {
	const cookieYear = await getCookieYear()
	const year = cookieYear || getCurrentYear()

	const user = await getUser(Number(params.id), year)
	if (!user) return <></>

	const userSession = year === getCurrentYear() ? await getUserSession() : null
	const userAccess = user.id === userSession?.id

	const gpsAmount = user.userResults.length

	const userStanding = user.userStandings.find(
		(userStanding) => userStanding.year === year
	)

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				<Col>
					<Card>
						<CardHeader className='d-flex align-items-center justify-content-center gap-1'>
							{user.firstName} {user.lastName}
							{!!user.userStars.length && (
								<Stars isSup={false} userStars={user.userStars} />
							)}
						</CardHeader>
						<CardBody className='p-2'>
							<Link href='/standings'>
								<CardBodyRow
									title={'Position'}
									value={`${userStanding?.pos || 0} / ${
										participants[year] || 0
									}`}
								/>
							</Link>
							<CardBodyRow
								title={'Total points'}
								value={userStanding?.points}
							/>
							<Medals
								medals={[
									userStanding?.m1 || null,
									userStanding?.m2 || null,
									userStanding?.m3 || null
								]}
							/>
							<CardBodyRow title={`GP's`} value={gpsAmount} />
							<CardBodyRow
								title={'Average per GP'}
								value={
									userStanding?.points &&
									(userStanding?.points / gpsAmount).toFixed(2)
								}
							/>
							<CardBodyRow
								title={'Average per rider'}
								value={
									userStanding?.points &&
									(userStanding?.points / gpsAmount / 3).toFixed(2)
								}
							/>
							<CardBodyRow
								title={'Finished races'}
								value={userStanding?.races}
							/>

							{userAccess && <SignOut />}
						</CardBody>
					</Card>
				</Col>

				{userAccess && (
					<>
						{/* @ts-expect-error Server Component */}
						<GPsUpcoming userId={user.id} />
					</>
				)}

				{user.userResults.map((res) => {
					return (
						<Col key={res.gpId}>
							<Card
								className={classNames({
									goldBorder: res.pos === 1,
									silverBorder: res.pos === 2,
									bronzeBorder: res.pos === 3
								})}
							>
								<GPCardHeader
									cityId={res.gp.cityId}
									cityName={res.gp.city.name}
									nationCode={res.gp.city.nation.code}
									dateTime={res.gp.dateTime}
									round={res.gp.gp}
									rounds={rounds[year]}
								/>

								<CardBody className='p-2 pb-0'>
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

								<MoreButton href={'/gps/' + res.gpId} />
							</Card>
						</Col>
					)
				})}
			</Row>
		</AnimationWrapper>
	)
}
