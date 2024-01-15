import AnimationWrapper from '@/components/AnimationWrapper'
import GPCardHeader from '@/components/gp/CardHeader'
import PickRiders from '@/components/gp/PickRiders'
import RiderResults from '@/components/rider/Results'
import UserResults from '@/components/user/Results'
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

	return (
		<AnimationWrapper>
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

						{ridersActive && user && (
							<CardBody className='p-2'>
								<PickRiders gp={gp} riders={ridersActive} userId={user.id} />
							</CardBody>
						)}
					</Card>
				</Col>
			</Row>
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
		</AnimationWrapper>
	)
}
