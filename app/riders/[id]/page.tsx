import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import GPCardHeader from '@/components/gp/CardHeader'
import Medal from '@/components/Medal'
import Medals from '@/components/Medals'
import RiderCardHeader from '@/components/rider/CardHeader'
import { getRider } from '@/prisma/service'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Rider({ params }: { params: { id: string } }) {
	const rider = await getRider(Number(params.id))

	const pointsTotal =
		rider?.riderResults.reduce((acc, obj) => acc + obj.points, 0) || 0

	const racesTotal =
		rider?.riderResults.reduce((acc, obj) => acc + obj.races, 0) || 0

	const m1Total = rider?.riderResults.reduce((acc, obj) => acc + obj.m1, 0) || 0
	const m2Total = rider?.riderResults.reduce((acc, obj) => acc + obj.m2, 0) || 0
	const m3Total = rider?.riderResults.reduce((acc, obj) => acc + obj.m3, 0) || 0

	const picksTotal =
		rider?.riderResults.reduce(
			(acc, obj) => acc + obj.gp.userPicks.length,
			0
		) || 0

	return rider ? (
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
				{rider.riderResults.map((riderResult) => (
					<Col key={riderResult.gpId}>
						<Link href={'/gps/' + riderResult.gpId}>
							<Card>
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
									<CardBodyRow
										title={'Times picked'}
										value={riderResult.gp.userPicks.length}
									/>
								</CardBody>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</AnimationWrapper>
	) : (
		<div>Loading rider...</div>
	)
}
