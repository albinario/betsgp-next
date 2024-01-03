import TotalStandings from './TotalStandings'
import { getUserStandings } from '@/prisma/service'
import Row from 'react-bootstrap/Row'

export default async function Standings() {
	const userStandings = await getUserStandings(2023)

	return (
		<Row xs={1} md={2} className='gap-2'>
			<TotalStandings userStandings={userStandings} />
		</Row>
	)
}
