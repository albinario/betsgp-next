import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import Medals from '@/components/Medals'
import RiderCardHeader from '@/components/rider/CardHeader'
import { getCookieYear } from '@/cookies/service'
import getCurrentYear from '@/helpers/getCurrentYear'
import Link from 'next/link'
import { getRiderStandings } from '@/prisma/service'
import { Fragment } from 'react'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Riders() {
	const cookieYear = await getCookieYear()
	const riderStandings = await getRiderStandings(cookieYear || getCurrentYear())
	if (!riderStandings) return <></>

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				{riderStandings.map((riderStanding) => (
					<Fragment key={riderStanding.riderId}>
						{riderStanding.rider && (
							<Col>
								<Link href={'/riders/' + riderStanding.riderId}>
									<Card>
										<RiderCardHeader
											riderId={riderStanding.riderId}
											riderName={riderStanding.rider.name}
											nationCode={riderStanding.rider.nation.code}
											number={riderStanding.rider.number}
										/>
										<CardBody className='p-2'>
											<div style={{ minHeight: '22px' }}>
												<Medals
													medals={[
														riderStanding._sum.m1,
														riderStanding._sum.m2,
														riderStanding._sum.m3
													]}
												/>
											</div>
											<CardBodyRow
												title={'Points'}
												value={riderStanding._sum.points}
											/>
											<CardBodyRow
												title={'Races'}
												value={riderStanding._sum.races}
											/>
											<CardBodyRow
												title={'Times picked'}
												value={
													riderStanding.rider.pick1s.length +
													riderStanding.rider.pick2s.length +
													riderStanding.rider.pick3s.length
												}
											/>
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
