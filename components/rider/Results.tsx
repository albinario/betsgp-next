import classNames from 'classnames'
import Flag from '@/components/Flag'
import Medal from '@/components/Medal'
import { FlagCheckered, Picked } from '@/icons'
import Link from 'next/link'
import { getRiderResults } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'
import type { GP } from '@/types'

export default async function RiderResults({
	gp,
	userPicks
}: {
	gp: GP
	userPicks: number[] | null
}) {
	const riderResults = await getRiderResults(gp.id)
	if (!riderResults) return <></>

	let prev: number | null = 0
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
						showPos = riderResult.pos !== prev
						prev = riderResult.pos

						const picked: number =
							riderResult.rider.pick1s.length +
							riderResult.rider.pick2s.length +
							riderResult.rider.pick3s.length

						return (
							<tr key={riderResult.riderId}>
								<td className='text-end'>
									<span className={classNames({ 'opacity-0': !showPos })}>
										{riderResult.pos}
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
										<span
											className={classNames({
												highlight: userPicks?.includes(riderResult.riderId)
											})}
										>
											{riderResult.rider.name}
										</span>
									</Link>
								</td>
								<td className='text-end'>
									<Medal
										medals={[riderResult.m1, riderResult.m2, riderResult.m3]}
									/>
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
