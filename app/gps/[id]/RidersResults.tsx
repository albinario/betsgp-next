import classNames from 'classnames'
import Flag from '@/components/Flag'
import { FlagCheckered, Medal, Picked } from '@/icons'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import type { RiderResult } from '@/types'

export default async function RidersResults({
	ridersResults
}: {
	ridersResults: RiderResult[]
}) {
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
							<th colSpan={3} />
							<th>
								P<span className='d-none d-sm-inline'>oin</span>ts
							</th>
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
								riderResult.points,
								riderResult.m1,
								riderResult.m2,
								riderResult.m3,
								riderResult.races
							]

							showPos = false
							for (let i = 0; i < res.length; i++) {
								if (res[i] !== prev[i]) {
									showPos = true
									break
								}
							}

							prev = res

							const picked: number =
								riderResult.rider.pick1s.length +
								riderResult.rider.pick2s.length +
								riderResult.rider.pick3s.length

							return (
								<tr key={riderResult.riderId}>
									<td className='text-end'>
										<span className={classNames({ 'opacity-0': !showPos })}>
											{pos}
										</span>
									</td>
									<td className='d-flex align-items-center'>
										<Flag
											height='.7em'
											nationCode={riderResult.rider.nation.code}
										/>
										<span className='ms-1'>{riderResult.rider?.name}</span>
									</td>
									<td className='text-end'>
										{riderResult.m1 !== 0 && <Medal type={1} />}
										{riderResult.m2 !== 0 && <Medal type={2} />}
										{riderResult.m3 !== 0 && <Medal type={3} />}
									</td>
									<td>{riderResult.points}</td>
									<td>{riderResult.races}</td>
									<td>{picked}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Card>
		</Col>
	)
}
