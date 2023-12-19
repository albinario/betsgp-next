import Flag from '@/components/Flag'
import { getRiders } from '@/hooks/useRiders'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Link from 'next/link'
import AnimationWrapper from '@/components/AnimationWrapper'
import { Button, CardImg, CardTitle } from 'react-bootstrap'

export default async function Riders() {
	const riders = await getRiders()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				{riders.map((rider) => (
					<Col key={rider.id}>
						<Card>
							<CardImg src={`/riders/${rider.id}.jpg`} variant='top' />
							<div className='d-flex align-items-center justify-content-between p-2 position-absolute w-100'>
								<Flag className='flag me-2' nationCode={rider.nation.code} />
								<span className='overlay-text'>{rider.number}</span>
							</div>
							<CardHeader className='d-flex align-items-center justify-content-center'>
								{rider.name}
							</CardHeader>

							<CardBody>
								<div className='text-center'>
									<Link href={`/riders/${rider.id}`}>
										<Button variant='outline-warning' size='sm'>
											More
										</Button>
									</Link>
								</div>
							</CardBody>
						</Card>
					</Col>
				))}
			</Row>
		</AnimationWrapper>
	)
}
