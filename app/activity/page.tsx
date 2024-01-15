import Activity from '@/components/Activity'
import AnimationWrapper from '@/components/AnimationWrapper'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function ActivityPage() {
	return (
		<AnimationWrapper>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					{/* @ts-expect-error Server Component */}
					<Activity />
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
