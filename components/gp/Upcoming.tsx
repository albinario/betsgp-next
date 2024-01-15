import GPCardHeader from '@/components/gp/CardHeader'
import PickRiders from '@/components/gp/PickRiders'
import { rounds } from '@/data'
import { getDateTimeLocal } from '@/helpers/dateTime'
import { Pick } from '@/icons'
import Link from 'next/link'
import { getGpsUpcoming, getRidersActive } from '@/prisma/service'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

export default async function GPsUpcoming({
	take,
	userId
}: {
	take?: number
	userId?: number
}) {
	let gpsUpcoming = await getGpsUpcoming()
	if (!gpsUpcoming) return <></>

	if (take) gpsUpcoming = gpsUpcoming.slice(0, take)

	const ridersActive = userId ? await getRidersActive() : null

	return (
		<>
			{gpsUpcoming.map((gp) => (
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

						{ridersActive && userId && (
							<CardBody className='p-2'>
								<PickRiders gp={gp} riders={ridersActive} userId={userId} />
							</CardBody>
						)}

						{!userId && (
							<>
								<Table
									borderless
									className='mb-1'
									hover
									responsive
									size='sm'
									striped
								>
									<tbody>
										{gp.activity.map((act) => (
											<tr key={act.id}>
												<td className='pe-0 text-center'>
													<Pick creation={act.creation} />
												</td>
												<td>
													<Link href={'/users/' + act.userId}>
														{act.user.firstName} {act.user.lastName}
													</Link>
												</td>
												<td className='pe-2 text-end text-muted'>
													<span className='small'>
														{getDateTimeLocal(act.dateTime)}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</Table>

								<Link href={'/gps/' + gp.id} className='d-grid p-2'>
									<Button size='sm' variant='outline-success'>
										More
									</Button>
								</Link>
							</>
						)}
					</Card>
				</Col>
			))}
		</>
	)
}
