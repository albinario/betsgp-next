import AnimationWrapper from '@/components/AnimationWrapper'
import RiderStandings from '@/components/rider/Standings'
import UserStandings from '@/components/user/Standings'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Standings() {
	return (
		<AnimationWrapper>
			<Row xs={1} md={2} className='g-2'>
				<Col>
					{/* @ts-expect-error Server Component */}
					<UserStandings />
				</Col>
				<Col>
					{/* @ts-expect-error Server Component */}
					<RiderStandings />
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
