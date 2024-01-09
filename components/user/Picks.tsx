import Flag from '@/components/Flag'
import { Medal } from '@/icons'
import Link from 'next/link'
import { getUserPicks } from '@/prisma/service'
import type { PickedRider } from '@/types'

export default async function UserPicks({
	gpId,
	userId
}: {
	gpId: number
	userId: number
}) {
	const userPicks = await getUserPicks(gpId, userId)

	const picks: PickedRider[] = userPicks
		? [userPicks.pick1, userPicks.pick2, userPicks.pick3]
		: []

	return (
		<>
			{picks.map((pick, index) => (
				<Link key={index} href={'/riders/' + pick.id}>
					<div className='d-flex justify-content-between'>
						<span className='d-flex align-items-center gap-1'>
							<Flag height='.7em' nationCode={pick.nation.code} />
							{pick.name}
						</span>
						<span className='d-flex align-items-center gap-1'>
							{pick.riderResults[0].m1 !== 0 && <Medal type={1} />}
							{pick.riderResults[0].m2 !== 0 && <Medal type={2} />}
							{pick.riderResults[0].m3 !== 0 && <Medal type={3} />}
							{pick.riderResults[0].points}
						</span>
					</div>
				</Link>
			))}
		</>
	)
}
