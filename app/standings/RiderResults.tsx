import classNames from 'classnames'
import Flag from '@/components/Flag'
import { Medal } from '@/icons'
import { getRiderResults } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'

export default async function RiderResults() {
	const riderResults = await getRiderResults(2023)
	let pos = 0

	return (
		<Col>
			<Card>
				<CardHeader className='text-center'>Riders</CardHeader>
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
							<th>Picked</th>
						</tr>
					</thead>
					<tbody>
						{riderResults.map((rider) => {
							pos++
							return (
								<tr key={rider.riderId}>
									<td className='text-end'>{pos}</td>
									<td className='d-flex align-items-center'>
										<Flag height='.7em' nationCode={rider.rider?.nation.code} />
										<span className='ms-1'>{rider.rider?.name}</span>
									</td>
									<td>{rider._sum.points}</td>
									{[rider._sum.m1, rider._sum.m2, rider._sum.m3].map(
										(m, index) => (
											<td
												key={index}
												className={classNames({ 'text-muted': !m })}
											>
												{m}
											</td>
										)
									)}
									<td>{rider._sum.races}</td>
									<td>p</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Card>
		</Col>
	)
}
