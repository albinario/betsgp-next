import classNames from 'classnames'
import Flag from '@/components/Flag'
import { FlagCheckered, Medal } from '@/icons'
import { getRiderResults } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'

export default async function RiderResults() {
	const riderResults = await getRiderResults(2023)

	let pos = 0
	let prev: (number | null)[] = []
	let showPos = true

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
							<th>
								<FlagCheckered />
							</th>
							<th>Picked</th>
						</tr>
					</thead>
					<tbody>
						{riderResults.map((rider) => {
							pos++

							const res = [
								rider._sum.points,
								rider._sum.m1,
								rider._sum.m2,
								rider._sum.m3,
								rider._sum.races
							]

							showPos = false
							for (let i = 0; i < res.length; i++) {
								if (res[i] !== prev[i]) {
									showPos = true
									break
								}
							}

							prev = res

							return (
								<tr key={rider.riderId}>
									<td className='text-end'>
										<span className={classNames({ 'opacity-0': !showPos })}>
											{pos}
										</span>
									</td>
									<td className='d-flex align-items-center'>
										<Flag height='.7em' nationCode={rider.rider?.nation.code} />
										<span className='ms-1'>{rider.rider?.name}</span>
									</td>
									<td>{rider._sum.points}</td>
									{[rider._sum.m1, rider._sum.m2, rider._sum.m3].map(
										(medals, index) => (
											<td
												key={index}
												className={classNames({ 'text-muted': !medals })}
											>
												{medals}
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
