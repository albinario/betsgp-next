import classNames from 'classnames'
import Flag from '@/components/Flag'
import { FlagCheckered, Medal, Picked } from '@/icons'
import Link from 'next/link'
import { getRiderResults } from '@/prisma/service'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'

export default async function RidersResults() {
	const ridersResults = await getRiderResults(2023)

	let pos = 0
	let prev: (number | null)[] = []
	let showPos = true

	return (
		<Col>
			<Card>
				<CardHeader className='text-center'>Riders</CardHeader>
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
							<th>
								<Picked />
							</th>
						</tr>
					</thead>
					<tbody>
						{ridersResults.map((riderResult) => {
							pos++

							const res = [
								riderResult._sum.points,
								riderResult._sum.m1,
								riderResult._sum.m2,
								riderResult._sum.m3,
								riderResult._sum.races
							]

							showPos = false
							for (let i = 0; i < res.length; i++) {
								if (res[i] !== prev[i]) {
									showPos = true
									break
								}
							}

							prev = res

							const picked: number = riderResult.rider
								? riderResult.rider.pick1s.length +
								  riderResult.rider.pick2s.length +
								  riderResult.rider.pick3s.length
								: 0

							return (
								<tr key={riderResult.riderId}>
									<td className='text-end'>
										<span className={classNames({ 'opacity-0': !showPos })}>
											{pos}
										</span>
									</td>
									<td className='d-flex align-items-center'>
										<Link href={'/riders/' + riderResult.riderId}>
											<Flag
												height='.7em'
												nationCode={riderResult.rider?.nation.code}
											/>
											<span className='ms-1'>{riderResult.rider?.name}</span>
										</Link>
									</td>
									<td>{riderResult._sum.points}</td>
									{[
										riderResult._sum.m1,
										riderResult._sum.m2,
										riderResult._sum.m3
									].map((medals, index) => (
										<td
											key={index}
											className={classNames({ 'text-muted': !medals })}
										>
											{medals}
										</td>
									))}
									<td>{riderResult._sum.races}</td>
									<td className={classNames({ 'text-muted': !picked })}>
										{picked}
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Card>
		</Col>
	)
}
