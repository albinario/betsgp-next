import AnimationWrapper from '@/components/AnimationWrapper'
import RiderStandings from '@/components/rider/Standings'
import UserStandings from '@/components/user/Standings'
import getUserSession from '@/helpers/getUserSession.server'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Standings() {
	const user = await getUserSession()

	return (
		<AnimationWrapper>
			<Row xs={1} md={2} className='g-2'>
				<Col>
					{/* @ts-expect-error Server Component */}
					<UserStandings userId={user?.id} />
				</Col>
				<Col id='riders'>
					{/* @ts-expect-error Server Component */}
					<RiderStandings />
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
