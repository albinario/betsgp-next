import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import GPCardHeader from '@/components/gp/CardHeader'
import Medals from '@/components/Medals'
import RiderCardHeader from '@/components/rider/CardHeader'
import { Medal } from '@/icons'
import { getRider } from '@/prisma/service'
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
							<CardBodyRow title={'Points'} value={pointsTotal} />
							<CardBodyRow title={'Races'} value={racesTotal} />
						</CardBody>
					</Card>
				</Col>
				{rider.riderResults.map((res) => {
					return (
						<Col key={res.gpId}>
							<Card>
								<GPCardHeader
									cityId={res.gp.cityId}
									cityName={res.gp.city.name}
									nationCode={res.gp.city.nation.code}
									dateTime={res.gp.dateTime}
									round={res.gp.gp}
									rounds={10}
								/>
								<CardBody className='p-2'>
									<div className='d-flex justify-content-between'>
										<span>Points</span>
										<span className='d-flex align-items-center'>
											{res.m1 !== 0 && <Medal type={1} />}
											{res.m2 !== 0 && <Medal type={2} />}
											{res.m3 !== 0 && <Medal type={3} />}
											<span className='ms-1'>{res.points}</span>
										</span>
									</div>
									<CardBodyRow title={'Races'} value={res.races}></CardBodyRow>
								</CardBody>
							</Card>
						</Col>
					)
				})}
			</Row>
		</AnimationWrapper>
	) : (
		<div>Loading rider...</div>
	)
}
