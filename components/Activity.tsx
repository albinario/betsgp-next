import classNames from 'classnames'
import Flag from '@/components/Flag'
import MoreButton from '@/components/MoreButton'
import Stars from '@/components/Stars'
import { getDateTimeLocalFormatted } from '@/helpers/dateTime'
import { Pick } from '@/icons'
import Link from 'next/link'
import { getActivity } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'

export default async function Activity({
	take,
	userId
}: {
	take?: number
	userId?: number
}) {
	let activity = await getActivity()
	if (!activity) return <></>

	if (take) activity = activity.slice(0, take)

	return (
		<Card>
			<CardHeader className='py-1 text-center'>Activity</CardHeader>
			<Table borderless className='mb-1' hover responsive size='sm' striped>
				<tbody>
					{activity.map((act) => (
						<tr key={act.id}>
							<td className='pe-0 text-center'>
								<Pick creation={act.creation} />
							</td>
							<td>
								<span className='d-flex align-items-center gap-1'>
									<Link
										className={classNames('text-nowrap', {
											highlight: act.userId === userId
										})}
										href={'/users/' + act.userId}
									>
										{act.user.firstName} {act.user.lastName}
										{!!act.user.userStars.length && (
											<Stars isSup={true} userStars={act.user.userStars} />
										)}
									</Link>
									<Flag height='.7em' nationCode={act.gp.city.nation.code} />
									{act.gp.city.name}
								</span>
							</td>
							<td className='pe-2 text-end text-muted'>
								<span className='small'>
									{getDateTimeLocalFormatted(act.dateTime)}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{take && <MoreButton href={'/activity'} />}
		</Card>
	)
}
