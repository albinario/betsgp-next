import classNames from 'classnames'
import Flag from '@/components/Flag'
import Medals from '@/components/Medals'
import MoreButton from '@/components/MoreButton'
import Stars from '@/components/Stars'
import { getDateTimeLocal } from '@/helpers/dateTime'
import { FlagCheckered } from '@/icons'
import Link from 'next/link'
import { getUserResults } from '@/prisma/service'
import type { ReactElement } from 'react'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'
import type { GP, Rider } from '@/types'

export default async function UserResults({
	gp,
	take,
	userId,
	userPicks
}: {
	gp: GP
	take?: number
	userId?: number
	userPicks: number[] | null
}) {
	let userResults = await getUserResults(gp.id)
	if (!userResults) return <></>

	let userTr: ReactElement = <></>

	if (userId && take) {
		const userResult = userResults.filter(
			(userResult) => userResult.userId === userId
		)[0]

		if (userResult && userResult.pos && userResult.pos > take) {
			const picks: Rider[] = [
				userResult.user.userPicks[0].pick1,
				userResult.user.userPicks[0].pick2,
				userResult.user.userPicks[0].pick3
			]
			userTr = (
				<tr className='userTrTop'>
					<td className='text-end'>{userResult.pos}</td>
					<td className='pe-0 text-start'>
						<Link className='highlight' href={'/users/' + userResult.userId}>
							{userResult.user.firstName} {userResult.user.lastName}
							{!!userResult.user.userStars.length && (
								<Stars isSup={true} userStars={userResult.user.userStars} />
							)}
						</Link>
					</td>

					{picks
						.sort((a, b) => a.number - b.number)
						.map((pick) => (
							<td key={pick.id} className='px-0 text-nowrap' title={pick.name}>
								<Link href={'/riders/' + pick.id}>
									<span style={{ paddingBottom: '2px' }}>
										<Flag height='.7em' nationCode={pick.nation.code} />
										<span
											style={{
												fontSize: '.8em',
												marginLeft: '2px'
											}}
										>
											<span
												className={classNames({
													highlight: userPicks?.includes(pick.id)
												})}
											>
												{pick.number}
											</span>
										</span>
									</span>
								</Link>
							</td>
						))}

					<td className='text-nowrap'>
						<Medals medals={[userResult.m1, userResult.m2, userResult.m3]} />
					</td>
					<td>{userResult.points}</td>
					<td>{userResult.races}</td>
				</tr>
			)
		}
	}

	if (take) userResults = userResults.slice(0, take)

	let prev: number | null = 0
	let showPos = true

	const pickedRiders: number[] = []

	return (
		<Card>
			<CardHeader className='py-1 d-flex justify-content-center'>
				{take && (
					<div className='d-flex align-items-center gap-1'>
						<Flag height='.8em' nationCode={gp.city.nation.code} />
						{gp.city.name}
						<span className='position-absolute end-0 pe-2'>
							<span className='small text-muted'>
								{getDateTimeLocal(gp.dateTime).split(' ')[0]}
							</span>
						</span>
					</div>
				)}
				{!take && 'Results'}
			</CardHeader>
			<Table
				borderless
				className='mb-1 text-center'
				hover
				responsive
				size='sm'
				striped
			>
				<thead>
					<tr>
						<th colSpan={6} />
						<th>
							P<span className='d-none d-sm-inline'>oin</span>ts
						</th>
						<th>
							<FlagCheckered />
						</th>
					</tr>
				</thead>

				<tbody>
					{userResults.map((userResult) => {
						showPos = userResult.pos !== prev
						prev = userResult.pos

						const picks: Rider[] = [
							userResult.user.userPicks[0].pick1,
							userResult.user.userPicks[0].pick2,
							userResult.user.userPicks[0].pick3
						]

						return (
							<tr key={userResult.id}>
								<td className='text-end'>
									<span className={classNames({ 'opacity-0': !showPos })}>
										{userResult.pos}
									</span>
								</td>
								<td className='pe-0 text-start'>
									<Link
										className={classNames({
											highlight: userResult.userId === userId
										})}
										href={'/users/' + userResult.userId}
									>
										{userResult.user.firstName} {userResult.user.lastName}
										{!!userResult.user.userStars.length && (
											<Stars
												isSup={true}
												userStars={userResult.user.userStars}
											/>
										)}
									</Link>
								</td>

								{picks
									.sort((a, b) => a.number - b.number)
									.map((pick) => {
										const unique = !pickedRiders.includes(pick.id)
										if (unique) pickedRiders.push(pick.id)

										return (
											<td
												key={pick.id}
												className='px-0 text-nowrap'
												title={pick.name}
											>
												<Link href={'/riders/' + pick.id}>
													<span
														className={classNames({ unique })}
														style={{ paddingBottom: '2px' }}
													>
														<Flag height='.7em' nationCode={pick.nation.code} />
														<span
															style={{
																fontSize: '.8em',
																marginLeft: '2px'
															}}
														>
															<span
																className={classNames({
																	highlight: userPicks?.includes(pick.id)
																})}
															>
																{pick.number}
															</span>
														</span>
													</span>
												</Link>
											</td>
										)
									})}

								<td className='text-nowrap'>
									<Medals
										medals={[userResult.m1, userResult.m2, userResult.m3]}
									/>
								</td>
								<td>{userResult.points}</td>
								<td>{userResult.races}</td>
							</tr>
						)
					})}
					{userTr}
				</tbody>
			</Table>

			{take && <MoreButton href={'/gps/' + gp.id} />}
		</Card>
	)
}
