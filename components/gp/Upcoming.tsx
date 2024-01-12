'use client'
import GPCardHeader from '@/components/gp/CardHeader'
import PickRiders from '@/components/gp/PickRiders'
import { useUser } from '@/context/UserContext'
import { rounds } from '@/data'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import type { GP, Rider } from '@/types'

export default function GPsUpcoming({
	gps,
	riders
}: {
	gps: GP[]
	riders: Rider[]
}) {
	const user = useUser()
	if (!user) return <></>

	return (
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
							rounds={rounds[gp.dateTime.getFullYear()]}
						/>

						<CardBody className='p-2'>
							<PickRiders gp={gp} riders={riders} userId={user.id} />
						</CardBody>
					</Card>
				</Col>
			))}
		</>
	)
}