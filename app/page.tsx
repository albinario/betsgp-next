import Activity from '@/components/Activity'
import AnimationWrapper from '@/components/AnimationWrapper'
import GPsUpcoming from '@/components/gp/Upcoming'
import RiderStandings from '@/components/rider/Standings'
import UserResults from '@/components/user/Results'
import UserStandings from '@/components/user/Standings'
import { getCookieYear } from '@/cookies/service'
import getUserSession from '@/helpers/userSession.server'
import { getGpLatest } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Home() {
	const user = await getUserSession()
	const userId = user?.id

	const gpLatest = await getGpLatest()

	const cookieYear = await getCookieYear()

	return (
		<AnimationWrapper>
			<Row className='g-2'>
				<Col lg={9}>
					<Row className='g-2' xs={1} lg={2}>
						<Col>
							{/* @ts-expect-error Server Component */}
							<UserStandings take={10} userId={userId} year={cookieYear} />
						</Col>
						<Col>
							{gpLatest && (
								<>
									{/* @ts-expect-error Server Component */}
									<UserResults gp={gpLatest} take={10} userId={userId} />
								</>
							)}
						</Col>
						<Col>
							{/* @ts-expect-error Server Component */}
							<RiderStandings take={10} year={cookieYear} />
						</Col>
						<Col>
							{/* @ts-expect-error Server Component */}
							<Activity take={11} userId={userId} />
						</Col>
					</Row>
				</Col>
				<Col>
					<Row xs={1} className='g-2'>
						{/* @ts-expect-error Server Component */}
						<GPsUpcoming take={2} userId={userId} />
					</Row>
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
