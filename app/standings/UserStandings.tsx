import classNames from 'classnames'
import { Arrow, Medal } from '@/icons'
import { getUserStandings } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'

export default async function UserStandings() {
	const userStandings = await getUserStandings(2023)

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
							<th>races</th>
						</tr>
					</thead>
					<tbody>
						{userStandings.map((user) => (
							<tr key={user.id}>
								<td className='d-flex align-items-center justify-content-end '>
									{user.pos}
									{user.pos && user.prevPos && (
										<Arrow diff={user.prevPos - user.pos} />
									)}
								</td>
								<td className='text-start'>
									{user.user.firstName} {user.user.lastName}
								</td>
								<td>{user.points}</td>
								{[user.m1, user.m2, user.m3].map((m, index) => (
									<td key={index} className={classNames({ 'text-muted': !m })}>
										{m}
									</td>
								))}
								<td>{user.races}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card>
		</Col>
	)
}
