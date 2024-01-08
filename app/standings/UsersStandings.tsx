import classNames from 'classnames'
import { Arrow, FlagCheckered, Medal } from '@/icons'
import Link from 'next/link'
import { getUserStandings } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'

export default async function UsersStandings() {
	const usersStandings = await getUserStandings(2023)

	let prev: number | null = 0
	let showPos = true

	return (
		<Col>
			<Card>
				<CardHeader className='text-center'>Total standings</CardHeader>
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
							<th></th>
							<th></th>
							<th>Points</th>
							{[1, 2, 3].map((m) => (
								<th key={m}>
									<Medal type={m} />
								</th>
							))}
							<th>
								<FlagCheckered />
							</th>
						</tr>
					</thead>
					<tbody>
						{usersStandings.map((userStanding) => {
							showPos = userStanding.pos === prev ? false : true
							prev = userStanding.pos

							return (
								<tr key={userStanding.id}>
									<td className='d-flex align-items-center justify-content-end'>
										<span className={classNames({ 'opacity-0': !showPos })}>
											{userStanding.pos}
										</span>
										{userStanding.pos && userStanding.prevPos && (
											<Arrow diff={userStanding.prevPos - userStanding.pos} />
										)}
									</td>
									<td className='text-start'>
										<Link href={'/users/' + userStanding.userId}>
											{userStanding.user.firstName} {userStanding.user.lastName}
										</Link>
									</td>
									<td>{userStanding.points}</td>
									{[userStanding.m1, userStanding.m2, userStanding.m3].map(
										(medals, index) => (
											<td
												key={index}
												className={classNames({ 'text-muted': !medals })}
											>
												{medals}
											</td>
										)
									)}
									<td>{userStanding.races}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Card>
		</Col>
	)
}
