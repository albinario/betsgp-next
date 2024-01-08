import AnimationWrapper from '@/components/AnimationWrapper'
import RidersResults from './RidersResults'
import UsersStandings from './UsersStandings'
import Row from 'react-bootstrap/Row'

export default async function Standings() {
	return (
		<AnimationWrapper>
			<Row xs={1} md={2} className='g-2'>
				{/* @ts-expect-error Server Component */}
				<UsersStandings />
				{/* @ts-expect-error Server Component */}
				<RidersResults />
			</Row>
		</AnimationWrapper>
	)
}
