import Activity from '@/components/Activity'
import AnimationWrapper from '@/components/AnimationWrapper'
import RiderStandings from '@/components/rider/Standings'
import UserResults from '@/components/user/Results'
import UserStandings from '@/components/user/Standings'
import { getCookieYear } from '@/cookies/service'
import getCurrentYear from '@/helpers/getCurrentYear'
import getUserSession from '@/helpers/getUserSession.server'
import { getGpLatest } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Home() {
	const user = await getUserSession()
	const userId = user?.id

	const gpLatest = await getGpLatest()

	const cookieYear = await getCookieYear()
	const year = cookieYear || getCurrentYear()

	return (
		<AnimationWrapper>
			<Row className='g-2' xs={1} lg={2}>
				<Col>
					{/* @ts-expect-error Server Component */}
					<UserStandings topTen={true} userId={userId} year={year} />
				</Col>
				<Col>
					{gpLatest && (
						<>
							{/* @ts-expect-error Server Component */}
							<UserResults gp={gpLatest} topTen={true} userId={userId} />
						</>
					)}
				</Col>
				<Col>
					{/* @ts-expect-error Server Component */}
					<RiderStandings topTen={true} year={year} />
				</Col>
				<Col>
					{/* @ts-expect-error Server Component */}
					<Activity topTen={true} userId={userId} />
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
