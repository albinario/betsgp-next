import classNames from 'classnames'
import Flag from '@/components/Flag'
import { FlagCheckered, Medal, Picked } from '@/icons'
import Link from 'next/link'
import { getRiderResults } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'
import type { GP } from '@/types'

export default async function RiderResults({ gp }: { gp: GP }) {
	const riderResults = await getRiderResults(gp.id)
	let pos = 0
	let prev: (number | null)[] = []
	let showPos = true

	return (
		<Card>
			<CardHeader className='py-1 text-center'>Riders</CardHeader>
			<Table
				borderless
				className='mb-1 text-center'
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
					{riderResults.map((riderResult) => {
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
								<td>
									<Link
										className='d-flex align-items-center gap-1'
										href={'/riders/' + riderResult.riderId}
									>
										<Flag
											height='.7em'
											nationCode={riderResult.rider.nation.code}
										/>
										{riderResult.rider.name}
									</Link>
								</td>
								<td className='text-end'>
									{riderResult.m1 !== 0 && <Medal type={1} />}
									{riderResult.m2 !== 0 && <Medal type={2} />}
									{riderResult.m3 !== 0 && <Medal type={3} />}
								</td>
								<td>{riderResult.points}</td>
								<td>{riderResult.races}</td>
								<td className={classNames({ 'text-muted': !picked })}>
									{picked}
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</Card>
	)
}
