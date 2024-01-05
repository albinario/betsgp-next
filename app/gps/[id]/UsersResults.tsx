import classNames from 'classnames'
import Flag from '@/components/Flag'
import { FlagCheckered, Medal } from '@/icons'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'
import type { Rider, UserResult } from '@/types'

export default async function UsersResults({
	usersResults
}: {
	usersResults: UserResult[]
}) {
	let prev: number | null = 0
	let showPos = true

	return (
		<Col>
			<Card>
				<CardHeader className='text-center'>Standings</CardHeader>
				<Table borderless className='p-1 text-center' hover size='sm' striped>
					<thead>
						<tr>
							<th></th>
							<th></th>
							<th></th>
							<th>
								P<span className='d-none d-sm-inline'>oin</span>ts
							</th>
							<th></th>
							<th>
								<FlagCheckered />
							</th>
						</tr>
					</thead>
					<tbody>
						{usersResults.map((userResult) => {
							showPos = userResult.pos === prev ? false : true
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
									<td>
										<div className='d-flex justify-content-center'>
											{picks
												.sort((a, b) => a.number - b.number)
												.map((pick) => (
													<div
														key={pick.id}
														className='d-flex align-items-center'
													>
														<Flag height='.7em' nationCode={pick.nation.code} />
														<span className='small me-1'>{pick.number}</span>
													</div>
												))}
										</div>
									</td>
									<td>{userResult.points}</td>
									<td>
										{userResult.m1 !== 0 && <Medal type={1} />}
										{userResult.m2 !== 0 && <Medal type={2} />}
										{userResult.m3 !== 0 && <Medal type={3} />}
									</td>
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
