import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import Medals from '@/components/Medals'
import RiderCardHeader from '@/components/rider/CardHeader'
import Link from 'next/link'
import { getRiderStandings } from '@/prisma/service'
import { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Riders() {
	const riders = await getRiderStandings(2023)

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				{riders?.map((rider) => (
					<Fragment key={rider.riderId}>
						{rider.rider && (
							<Col>
								<Link href={'/riders/' + rider.riderId}>
									<Card>
										<RiderCardHeader
											riderId={rider.riderId}
											riderName={rider.rider.name}
											nationCode={rider.rider.nation.code}
											number={rider.rider.number}
										/>
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
