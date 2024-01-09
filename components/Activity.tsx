import { Pick } from '@/icons'
import Link from 'next/link'
import { getActivity } from '@/prisma/service'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardHeader from 'react-bootstrap/CardHeader'
import Table from 'react-bootstrap/Table'
import getLocalDateTime from '@/helpers/getDateTime'
import Flag from './Flag'

export default async function Activity({ topTen }: { topTen?: boolean }) {
	let activity = await getActivity()

	if (topTen) activity = activity.slice(0, 11)

	return (
		<Card>
			<CardHeader className='py-1 text-center'>Activity</CardHeader>
			<Table borderless className='mb-1' hover responsive size='sm' striped>
				<tbody>
					{activity.map((act, index) => {
						if (index === 0) console.log(act)

						return (
							<tr key={act.id}>
								<td className='text-center'>
									<Pick creation={act.creation} />
								</td>
								<td>
									<Link href={'/users/' + act.userId}>
										{act.user.firstName} {act.user.lastName}
									</Link>
								</td>
								<td className='d-flex align-items-center justify-content-end gap-1 pe-0'>
									<Flag height='.7em' nationCode={act.gp.city.nation.code} />
									{act.gp.city.name}
								</td>
								<td className='pe-2 text-end'>
									{getLocalDateTime(act.dateTime)}
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>

			{topTen && (
				<Link href={'/activity'} className='d-grid p-2'>
					<Button size='sm' variant='outline-success'>
						More
					</Button>
				</Link>
			)}
		</Card>
	)
}
