import Activity from '@/components/Activity'
import AnimationWrapper from '@/components/AnimationWrapper'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Standings() {
	return (
		<AnimationWrapper>
			<Row xs={1}>
				<Col>
					{/* @ts-expect-error Server Component */}
					<Activity />
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
