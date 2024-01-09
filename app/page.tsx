import UserResults from '@/components/user/Results'
import UserStandings from '@/components/user/Standings'
import { getGpLatest, getUser } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { readSession } from '@/supabase/service'
import RiderStandings from '@/components/rider/Standings'
import Activity from '@/components/Activity'

export default async function Home() {
	// const session = await readSession()

	// const user = session.data.session?.user

	// const userDetails = user ? await getUser(user.id) : null

	const gpLatest = await getGpLatest()

	return (
		<Row className='g-2' xs={1} lg={2}>
			<Col>
				{/* @ts-expect-error Server Component */}
				<UserStandings topTen={true} />
			</Col>
			<Col>
				{/* @ts-expect-error Server Component */}
				{gpLatest && <UserResults gp={gpLatest} topTen={true} />}
			</Col>
			<Col>
				{/* @ts-expect-error Server Component */}
				<RiderStandings topTen={true} />
			</Col>
			<Col>
				{/* @ts-expect-error Server Component */}
				<Activity topTen={true} />
			</Col>
		</Row>
	)
}
