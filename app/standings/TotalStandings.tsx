import classNames from 'classnames'
import { Arrow, Medal } from '@/icons'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'
import type { UserStanding } from '@/types'

export default function TotalStandings({
	userStandings
}: {
	userStandings: UserStanding[]
}) {
	return (
		<Col>
			<Card>
				<CardHeader className='text-center'>Total standings</CardHeader>
				<Table size='sm' borderless hover striped className='text-center p-1'>
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
								<td className='text-end'>
									{user.pos}{' '}
									{user.pos && user.prevPos && (
										<Arrow diff={user.prevPos - user.pos} />
									)}
								</td>
								<td className='text-start'>
									{user.user.firstName} {user.user.lastName}
								</td>
								<td>{user.points}</td>
								<td className={classNames({ 'text-muted': !user.m1 })}>
									{user.m1}
								</td>
								<td className={classNames({ 'text-muted': !user.m2 })}>
									{user.m2}
								</td>
								<td className={classNames({ 'text-muted': !user.m3 })}>
									{user.m3}
								</td>
								<td>{user.races}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card>
		</Col>
	)
}
