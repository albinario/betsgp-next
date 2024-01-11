import AnimationWrapper from '@/components/AnimationWrapper'
import UserResults from '@/components/user/Results'
import UserStandings from '@/components/user/Standings'
import getUserSession from '@/helpers/getUserSession.server'
import { getGpLatest } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import RiderStandings from '@/components/rider/Standings'
import Activity from '@/components/Activity'

export default async function Home() {
	const user = await getUserSession()
	const gpLatest = await getGpLatest()

	return (
		<AnimationWrapper>
			<Row className='g-2' xs={1} lg={2}>
				<Col>
					{/* @ts-expect-error Server Component */}
					<UserStandings topTen={true} userId={user?.id} />
				</Col>
				<Col>
					{gpLatest && (
						<>
							{/* @ts-expect-error Server Component */}
							<UserResults gp={gpLatest} topTen={true} userId={user?.id} />
						</>
					)}
				</Col>
				<Col>
					{/* @ts-expect-error Server Component */}
					<RiderStandings topTen={true} user />
				</Col>
				<Col>
					{/* @ts-expect-error Server Component */}
					<Activity topTen={true} />
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
