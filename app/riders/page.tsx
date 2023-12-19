import AnimationWrapper from '@/components/AnimationWrapper'
import Flag from '@/components/Flag'
import { getRiders } from '@/hooks/useRiders'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardImg from 'react-bootstrap/CardImg'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Link from 'next/link'

export default async function Riders() {
	const riders = await getRiders()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				{riders.map((rider) => (
					<Col key={rider.id}>
						<Link href={'/riders/' + rider.id}>
							<Card>
								<CardImg src={`/riders/${rider.id}.jpg`} variant='top' />
								<div className='position-absolute p-2 w-100'>
									<div className='d-flex align-items-center justify-content-between'>
										<span className='overlay-text'>{rider.name}</span>
										<Flag height={'1.5em'} nationCode={rider.nation.code} />
									</div>
									<span className='overlay-text small'>{rider.number}</span>
								</div>

								<CardBody></CardBody>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</AnimationWrapper>
	)
}
