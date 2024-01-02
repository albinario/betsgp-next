import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import Flag from '@/components/Flag'
import Medals from '@/components/Medals'
import { getRider } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardImg from 'react-bootstrap/CardImg'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Rider({ params }: { params: { id: string } }) {
	const rider = params.id ? await getRider(Number(params.id)) : null

	const pointsTotal =
		rider?.riderResults.reduce((acc, obj) => acc + obj.points, 0) || 0

	const racesTotal =
		rider?.riderResults.reduce((acc, obj) => acc + obj.races, 0) || 0

	const m1Total =
		rider?.riderResults.reduce((acc, obj) => {
			if (obj.m1) return acc + obj.m1
			return acc
		}, 0) || 0

	const m2Total =
		rider?.riderResults.reduce((acc, obj) => {
			if (obj.m2) return acc + obj.m2
			return acc
		}, 0) || 0

	const m3Total =
		rider?.riderResults.reduce((acc, obj) => {
			if (obj.m3) return acc + obj.m3
			return acc
		}, 0) || 0

	return rider ? (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				<Col>
					<Card>
						<CardImg src={`/riders/${rider.id}.jpg`} variant='top' />
						<div className='position-absolute p-2 w-100'>
							<div className='d-flex align-items-center justify-content-between'>
								<span className='overlay-text'>{rider.name}</span>
								<Flag height={'1.5em'} nationCode={rider.nation.code} />
							</div>
							<span className='overlay-text small'>{rider.number}</span>
						</div>
						<CardBody className='p-2'>
							<Medals medals={[m1Total, m2Total, m3Total]} />
							<CardBodyRow title={'Points'} value={pointsTotal} />
							<CardBodyRow title={'Races'} value={racesTotal} />
						</CardBody>
					</Card>
				</Col>
			</Row>
		</AnimationWrapper>
	) : (
		<div>Loading rider...</div>
	)
}
