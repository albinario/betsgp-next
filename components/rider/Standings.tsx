import classNames from 'classnames'
import Flag from '@/components/Flag'
import MoreButton from '@/components/MoreButton'
import { isIdentical } from '@/helpers/array'
import { FlagCheckered, Medal, Picked } from '@/icons'
import Link from 'next/link'
import { getRiderStandings } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'

export default async function RiderStandings({
	take,
	year
}: {
	take?: number
	year?: number
}) {
	let riderStandings = await getRiderStandings(year)
	if (!riderStandings) return <></>

	if (take) riderStandings = riderStandings.slice(0, take)

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
						<th colSpan={2} />
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
					{riderStandings.map((riderStanding) => {
						pos++

						const res = [
							riderStanding._sum.points,
							riderStanding._sum.m1,
							riderStanding._sum.m2,
							riderStanding._sum.m3,
							riderStanding._sum.races
						]

						showPos = isIdentical(prev, res) ? false : true

						prev = [...res]

						const picked: number = riderStanding.rider
							? riderStanding.rider.pick1s.length +
							  riderStanding.rider.pick2s.length +
							  riderStanding.rider.pick3s.length
							: 0

						return (
							<tr key={riderStanding.riderId}>
								<td className='text-end'>
									<span className={classNames({ 'opacity-0': !showPos })}>
										{pos}
									</span>
								</td>
								<td>
									<Link
										className='d-flex align-items-center gap-1'
										href={'/riders/' + riderStanding.riderId}
									>
										<Flag
											height='.7em'
											nationCode={riderStanding.rider?.nation.code}
										/>
										{riderStanding.rider?.name}
									</Link>
								</td>
								<td>{riderStanding._sum.points}</td>
								{[
									riderStanding._sum.m1,
									riderStanding._sum.m2,
									riderStanding._sum.m3
								].map((medals, index) => (
									<td
										key={index}
										className={classNames({ 'text-muted': !medals })}
									>
										{medals}
									</td>
								))}
								<td>{riderStanding._sum.races}</td>
								<td className={classNames({ 'text-muted': !picked })}>
									{picked}
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>

			{take && <MoreButton href={'/standings#riders'} />}
		</Card>
	)
}
