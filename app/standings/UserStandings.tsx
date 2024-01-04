import classNames from 'classnames'
import { Arrow, FlagCheckered, Medal } from '@/icons'
import { getUserStandings } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'

export default async function UserStandings() {
	const userStandings = await getUserStandings(2023)

	let prev: number | null = 0
	let showPos = true

	return (
		<Col>
			<Card>
				<CardHeader className='text-center'>Total standings</CardHeader>
				<Table borderless className='p-1 text-center' hover size='sm' striped>
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
						{userStandings.map((user) => {
							showPos = user.pos === prev ? false : true
							prev = user.pos

							return (
								<tr key={user.id}>
									<td className='d-flex align-items-center justify-content-end '>
										<span className={classNames({ 'opacity-0': !showPos })}>
											{user.pos}
										</span>
										{user.pos && user.prevPos && (
											<Arrow diff={user.prevPos - user.pos} />
										)}
									</td>
									<td className='text-start'>
										{user.user.firstName} {user.user.lastName}
									</td>
									<td>{user.points}</td>
									{[user.m1, user.m2, user.m3].map((medals, index) => (
										<td
											key={index}
											className={classNames({ 'text-muted': !medals })}
										>
											{medals}
										</td>
									))}
									<td>{user.races}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Card>
		</Col>
	)
}
