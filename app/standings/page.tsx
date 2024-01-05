import RidersResults from './RidersResults'
import UsersStandings from './UsersStandings'
import Row from 'react-bootstrap/Row'

export default async function Standings() {
	return (
		<Row xs={1} md={2} className='g-2'>
			{/* @ts-expect-error Server Component */}
			<UsersStandings />
			{/* @ts-expect-error Server Component */}
			<RidersResults />
		</Row>
	)
}
