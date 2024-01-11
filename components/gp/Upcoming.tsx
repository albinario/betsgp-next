'use client'
import GPCardHeader from '@/components/gp/CardHeader'
import PickRiders from '@/components/gp/PickRiders'
import { useUser } from '@/context/UserContext'
import { rounds } from '@/data'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import type { GP, Rider } from '@/types'

export default function GPUpcoming({
	gps,
	riders
}: {
	gps: GP[]
	riders: Rider[]
}) {
	const year = 2023
	const user = useUser()

	return user ? (
		<>
			{gps.map((gp) => (
				<Col key={gp.id}>
					<Card>
						<GPCardHeader
							cityId={gp.cityId}
							cityName={gp.city.name}
							nationCode={gp.city.nation.code}
							dateTime={gp.dateTime}
							round={gp.gp}
							rounds={rounds[year]}
						/>

						<CardBody className='p-2'>
							<PickRiders gp={gp} riders={riders} userId={user.id} />
						</CardBody>
					</Card>
				</Col>
			))}
		</>
	) : (
		<></>
	)
}
