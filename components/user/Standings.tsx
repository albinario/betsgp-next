import classNames from 'classnames'
import { Arrow, FlagCheckered, Medal } from '@/icons'
import Link from 'next/link'
import { getUserStandings } from '@/prisma/service'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'
import type { ReactElement } from 'react'

export default async function UserStandings({
	take,
	userId,
	year
}: {
	take?: number
	userId?: number
	year?: number
}) {
	let userStandings = await getUserStandings(year)
	if (!userStandings) return <></>

	let userTr: ReactElement = <></>

	if (userId && take) {
		const userStanding = userStandings.filter(
			(userStanding) => userStanding.userId === userId
		)[0]

		if (userStanding && userStanding.pos && userStanding.pos > take) {
			userTr = (
				<tr className='userTrTop'>
					<td className='d-flex align-items-center justify-content-end'>
						{userStanding.pos}
						{userStanding.pos && userStanding.prevPos && (
							<Arrow diff={userStanding.prevPos - userStanding.pos} />
						)}
					</td>
					<td className='text-start'>
						<Link className='highlight' href={'/users/' + userStanding.userId}>
							{userStanding.user.firstName} {userStanding.user.lastName}
						</Link>
					</td>
					<td>{userStanding.points}</td>
					{[userStanding.m1, userStanding.m2, userStanding.m3].map(
						(medals, index) => (
							<td key={index} className={classNames({ 'text-muted': !medals })}>
								{medals}
							</td>
						)
					)}
					<td>{userStanding.races}</td>
				</tr>
			)
		}
	}

	if (take) userStandings = userStandings.slice(0, take)

	let prev: number | null = 0
	let showPos = true

	return (
		<Card>
			<CardHeader className='py-1 text-center'>Total standings</CardHeader>
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
					</tr>
				</thead>
				<tbody>
					{userStandings.map((userStanding) => {
						showPos = userStanding.pos === prev ? false : true
						prev = userStanding.pos

						return (
							<tr key={userStanding.id}>
								<td className='d-flex align-items-center justify-content-end'>
									<span className={classNames({ 'opacity-0': !showPos })}>
										{userStanding.pos}
									</span>
									{userStanding.pos && userStanding.prevPos && (
										<Arrow diff={userStanding.prevPos - userStanding.pos} />
									)}
								</td>
								<td className='text-start'>
									<Link
										className={classNames({
											highlight: userStanding.userId === userId
										})}
										href={'/users/' + userStanding.userId}
									>
										{userStanding.user.firstName} {userStanding.user.lastName}
									</Link>
								</td>
								<td>{userStanding.points}</td>
								{[userStanding.m1, userStanding.m2, userStanding.m3].map(
									(medals, index) => (
										<td
											key={index}
											className={classNames({ 'text-muted': !medals })}
										>
											{medals}
										</td>
									)
								)}
								<td>{userStanding.races}</td>
							</tr>
						)
					})}
					{userTr}
				</tbody>
			</Table>

			{take && (
				<Link href={'/standings'} className='d-grid p-2'>
					<Button size='sm' variant='outline-success'>
						More
					</Button>
				</Link>
			)}
		</Card>
	)
}
