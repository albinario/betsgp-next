import RiderResults from './RiderResults'
import UserStandings from './UserStandings'
import Row from 'react-bootstrap/Row'

export default async function Standings() {
	return (
		<Row xs={1} md={2} className='g-2'>
			{/* @ts-expect-error Server Component */}
			<UserStandings />
			{/* @ts-expect-error Server Component */}
			<RiderResults />
		</Row>
	)
}
