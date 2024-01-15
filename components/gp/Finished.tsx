import classNames from 'classnames'
import GPCardHeader from '@/components/gp/CardHeader'
import { getCookieYear } from '@/cookies/service'
import { getDateTimeLocal } from '@/helpers/dateTime'
import { Medal, Pick } from '@/icons'
import Link from 'next/link'
import { getGpsFinished } from '@/prisma/service'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { rounds } from '@/data'

export default async function GPsFinished() {
	const cookieYear = await getCookieYear()
	const gpsFinished = await getGpsFinished(cookieYear)
	if (!gpsFinished) return <></>

	return (
		<>
			{gpsFinished.map((gp) => (
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

						<Table
							borderless
							className='mb-0'
							hover
							responsive
							size='sm'
							striped
						>
							<tbody>
								{gp.userResults.map((userResult, index) => (
									<tr key={index}>
										<td className='text-center'>
											<span
												className={classNames({
													'opacity-0': userResult.pos !== index + 1
												})}
											>
												{userResult.pos}
											</span>
										</td>
										<td>
											<Link href={'/users/' + userResult.userId}>
												{userResult.user.firstName} {userResult.user.lastName}
											</Link>
										</td>
										<td className='text-end'>
											{userResult.m1 !== 0 && <Medal type={1} />}
											{userResult.m2 !== 0 && <Medal type={2} />}
											{userResult.m3 !== 0 && <Medal type={3} />}
										</td>
										<td className='text-center'>{userResult.points}</td>
									</tr>
								))}
								{!gp.userResults &&
									gp.activity.map((act) => (
										<tr key={act.id}>
											<td className='text-center'>
												<Pick creation={act.creation} />
											</td>
											<td>
												<Link href={'/users/' + act.userId}>
													{act.user.firstName} {act.user.lastName}
												</Link>
											</td>
											<td className='text-end'>
												{getDateTimeLocal(act.dateTime, true)}
											</td>
										</tr>
									))}
							</tbody>

							{/* 
									
									<Card.Text className='text-center'>
									{next && <Countdown dateTime={gp.dateTime} />}
									</Card.Text>
									</>
								)} */}
						</Table>

						<Link href={'/gps/' + gp.id} className='d-grid p-2'>
							<Button size='sm' variant='outline-success'>
								More
							</Button>
						</Link>
					</Card>
				</Col>
			))}
		</>
	)
}
