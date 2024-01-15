import AnimationWrapper from '@/components/AnimationWrapper'
import RiderStandings from '@/components/rider/Standings'
import UserStandings from '@/components/user/Standings'
import { getCookieYear } from '@/cookies/service'
import getUserSession from '@/helpers/userSession.server'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function StandingsPage() {
	const user = await getUserSession()

	const cookieYear = await getCookieYear()

	return (
		<AnimationWrapper>
			<Row xs={1} md={2} className='g-2'>
				<Col>
					{/* @ts-expect-error Server Component */}
					<UserStandings userId={user?.id} year={cookieYear} />
				</Col>
				<Col id='riders'>
					{/* @ts-expect-error Server Component */}
					<RiderStandings year={cookieYear} />
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
