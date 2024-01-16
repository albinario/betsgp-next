import AnimationWrapper from '@/components/AnimationWrapper'
import Countdown from '@/components/Countdown'
import GPCardHeader from '@/components/gp/CardHeader'
import PickRiders from '@/components/gp/PickRiders'
import RiderResults from '@/components/rider/Results'
import UserResults from '@/components/user/Results'
import { getDateTimeLocal, getNowLocal } from '@/helpers/dateTime'
import getUserSession from '@/helpers/userSession.server'
import { getGp, getRidersActive, getUserPick } from '@/prisma/service'
import { CardBody } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function GPPage({ params }: { params: { id: string } }) {
	const gp = await getGp(Number(params.id))
	if (!gp) return <></>

	const user = await getUserSession()

	const userPick = user ? await getUserPick(gp.id, user.id) : null
	const userPicks = userPick
		? [userPick.pick1Id, userPick.pick2Id, userPick.pick3Id]
		: null

	const ridersActive = user ? await getRidersActive() : null
	const hasGpStarted = user
		? getDateTimeLocal(gp.dateTime) < getNowLocal()
		: null

	return (
		<AnimationWrapper>
			<Row className='g-2 mb-2'>
				<Col sm={12} xl={3}>
					<Card style={{ maxWidth: '400px' }}>
						<GPCardHeader
							cityId={gp.cityId}
							cityName={gp.city.name}
							nationCode={gp.city.nation.code}
							dateTime={gp.dateTime}
							round={gp.gp}
							rounds={10}
						/>

						{user && !hasGpStarted && ridersActive && (
							<CardBody className='p-2'>
								<PickRiders gp={gp} riders={ridersActive} userId={user.id} />
							</CardBody>
						)}

						<Countdown dateTime={gp.dateTime} />
					</Card>
				</Col>
				<Col>
					<Row xs={1} lg={2} className='g-2'>
						<Col>
							{/* @ts-expect-error Server Component */}
							<UserResults gp={gp} userId={user?.id} userPicks={userPicks} />
						</Col>
						<Col>
							{/* @ts-expect-error Server Component */}
							<RiderResults gp={gp} userPicks={userPicks} />
						</Col>
					</Row>
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
