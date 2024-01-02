import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import Flag from '@/components/Flag'
import Medals from '@/components/Medals'
import Link from 'next/link'
import { getRiderResults } from '@/prisma/service'
import { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardImg from 'react-bootstrap/CardImg'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Riders() {
	const riders = await getRiderResults(2023)

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				{riders?.map((rider) => (
					<Fragment key={rider.riderId}>
						{rider.rider && (
							<Col>
								<Link href={'/riders/' + rider.riderId}>
									<Card>
										<CardImg
											src={`/riders/${rider.riderId}.jpg`}
											variant='top'
										/>
										<div className='position-absolute p-2 w-100'>
											<div className='d-flex align-items-center justify-content-between'>
												<span className='overlay-text'>{rider.rider.name}</span>
												<Flag
													height={'1.5em'}
													nationCode={rider.rider.nation.code}
												/>
											</div>
											<span className='overlay-text small'>
												{rider.rider.number}
											</span>
										</div>
										<CardBody className='p-2'>
											<div style={{ minHeight: '22px' }}>
												<Medals
													medals={[rider._sum.m1, rider._sum.m2, rider._sum.m3]}
												/>
											</div>
											<CardBodyRow title={'Points'} value={rider._sum.points} />
											<CardBodyRow title={'Races'} value={rider._sum.races} />
										</CardBody>
									</Card>
								</Link>
							</Col>
						)}
					</Fragment>
				))}
			</Row>
		</AnimationWrapper>
	)
}
