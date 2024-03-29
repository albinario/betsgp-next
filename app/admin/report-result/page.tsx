import AnimationWrapper from '@/components/AnimationWrapper'
import PopulateRiderResults from '@/components/admin/CreateRiderResults'
import ReportResult from '@/components/admin/ReportResult'
import { getGpsUpcoming, getRidersActive } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function ReportResultPage() {
	const gps = await getGpsUpcoming()
	const ridersActive = await getRidersActive()

	return (
		<AnimationWrapper>
			<Row xs={1} lg={2} xl={3}>
				<Col>
					<ReportResult gps={gps} ridersActive={ridersActive} />
				</Col>
				<Col>
					<PopulateRiderResults
						gps={gps}
						riderIds={ridersActive.map((rider) => rider.id)}
					/>
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
