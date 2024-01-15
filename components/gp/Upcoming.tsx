import GPCardHeader from '@/components/gp/CardHeader'
import Countdown from '@/components/Countdown'
import MoreButton from '@/components/MoreButton'
import PickRiders from '@/components/gp/PickRiders'
import Stars from '@/components/Stars'
import { rounds } from '@/data'
import { getDateTimeLocalFormatted } from '@/helpers/dateTime'
import { Pick } from '@/icons'
import Link from 'next/link'
import { getGpsUpcoming, getRidersActive } from '@/prisma/service'
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
			{gpsUpcoming.map((gp, index) => (
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
														{!!act.user.userStars.length && (
															<Stars
																isSup={true}
																userStars={act.user.userStars}
															/>
														)}
													</Link>
												</td>
												<td className='pe-2 text-end text-muted'>
													<span className='small'>
														{getDateTimeLocalFormatted(act.dateTime, true)}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</Table>

								<MoreButton href={'/gps/' + gp.id} />
							</>
						)}
						{index === 0 && <Countdown dateTime={gp.dateTime} />}
					</Card>
				</Col>
			))}
		</>
	)
}
