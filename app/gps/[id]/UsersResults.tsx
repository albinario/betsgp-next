import classNames from 'classnames'
import Flag from '@/components/Flag'
import { FlagCheckered, Medal } from '@/icons'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import type { Rider, UserResult } from '@/types'

export default async function UsersResults({
	usersResults
}: {
	usersResults: UserResult[]
}) {
	let prev: number | null = 0
	let showPos = true

	const pickedRiders: number[] = []

	return (
		<Col>
			<Card>
				<CardHeader className='text-center'>Results</CardHeader>
				<Table
					borderless
					className='p-1 text-center'
					hover
					responsive
					size='sm'
					striped
				>
					<thead>
						<tr>
							<th colSpan={4} />
							<th>
								P<span className='d-none d-sm-inline'>oin</span>ts
							</th>
							<th>
								<FlagCheckered />
							</th>
						</tr>
					</thead>
					<tbody>
						{usersResults.map((userResult) => {
							showPos = userResult.pos !== prev
							prev = userResult.pos

							const picks: Rider[] = [
								userResult.user.userPicks[0].pick1,
								userResult.user.userPicks[0].pick2,
								userResult.user.userPicks[0].pick3
							]

							return (
								<tr key={userResult.id}>
									<td>
										<span className={classNames({ 'opacity-0': !showPos })}>
											{userResult.pos}
										</span>
									</td>
									<td className='text-start'>
										{userResult.user.firstName} {userResult.user.lastName}
									</td>
									<td className='d-flex justify-content-around'>
										{picks
											.sort((a, b) => a.number - b.number)
											.map((pick, index) => {
												const unique = !pickedRiders.includes(pick.id)
												if (unique) pickedRiders.push(pick.id)

												return (
													<div
														key={pick.id}
														style={{ marginRight: index !== 2 ? '2px' : '' }}
													>
														<span
															className={classNames({ unique })}
															style={{ paddingBottom: '2px' }}
														>
															<Flag
																height='.7em'
																nationCode={pick.nation.code}
															/>
															<span
																style={{
																	fontSize: '.8em',
																	marginLeft: '2px'
																}}
															>
																{pick.number}
															</span>
														</span>
													</div>
												)
											})}
									</td>
									<td>
										{userResult.m1 !== 0 && <Medal type={1} />}
										{userResult.m2 !== 0 && <Medal type={2} />}
										{userResult.m3 !== 0 && <Medal type={3} />}
									</td>
									<td>{userResult.points}</td>
									<td>{userResult.races}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Card>
		</Col>
	)
}
