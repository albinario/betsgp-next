import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import GPCardHeader from '@/components/gp/CardHeader'
import Medal from '@/components/Medal'
import Medals from '@/components/Medals'
import RiderCardHeader from '@/components/rider/CardHeader'
import { Picked } from '@/icons'
import { getRider } from '@/prisma/service'
import classNames from 'classnames'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function RiderPage({
	params
}: {
	params: { id: string }
}) {
	const rider = await getRider(Number(params.id))
	if (!rider) return <></>

	const pointsTotal = rider.riderResults.reduce(
		(acc, obj) => acc + obj.points,
		0
	)
	const m1Total = rider.riderResults.reduce((acc, obj) => acc + obj.m1, 0)
	const m2Total = rider.riderResults.reduce((acc, obj) => acc + obj.m2, 0)
	const m3Total = rider.riderResults.reduce((acc, obj) => acc + obj.m3, 0)

	const racesTotal = rider.riderResults.reduce((acc, obj) => acc + obj.races, 0)

	const picksTotal = rider.riderResults.reduce(
		(acc, obj) => acc + obj.gp.userPicks.length,
		0
	)

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				<Col>
					<Card>
						<RiderCardHeader
							riderId={rider.id}
							riderName={rider.name}
							nationCode={rider.nation.code}
							number={rider.number}
						/>
						<CardBody className='p-2'>
							<Medals medals={[m1Total, m2Total, m3Total]} />
							<CardBodyRow title={'Total points'} value={pointsTotal} />
							<CardBodyRow title={'Finished races'} value={racesTotal} />
							<CardBodyRow title={'Times picked'} value={picksTotal} />
						</CardBody>
					</Card>
				</Col>
				{rider.riderResults.map((riderResult) => {
					const isPicked = riderResult.gp.userPicks.find(
						(pick) => pick.userId === 1
					)
						? true
						: false

					return (
						<Col key={riderResult.gpId}>
							<Link href={'/gps/' + riderResult.gpId}>
								<Card
									className={classNames({
										highlightBorder: isPicked
									})}
								>
									<GPCardHeader
										cityId={riderResult.gp.cityId}
										cityName={riderResult.gp.city.name}
										nationCode={riderResult.gp.city.nation.code}
										dateTime={riderResult.gp.dateTime}
										round={riderResult.gp.gp}
										rounds={10}
									/>
									<CardBody className='p-2'>
										<div className='d-flex justify-content-between'>
											<span>Points</span>
											<span className='d-flex align-items-center'>
												<Medal
													medals={[
														riderResult.m1,
														riderResult.m2,
														riderResult.m3
													]}
												/>
												<span className='ms-1'>{riderResult.points}</span>
											</span>
										</div>
										<CardBodyRow title={'Races'} value={riderResult.races} />
										<div className='d-flex justify-content-between'>
											<span>Times picked</span>
											<span className='d-flex align-items-center gap-1'>
												{isPicked && <Picked clas={'highlight'} />}
												{riderResult.gp.userPicks.length}
											</span>
										</div>
									</CardBody>
								</Card>
							</Link>
						</Col>
					)
				})}
			</Row>
		</AnimationWrapper>
	)
}
