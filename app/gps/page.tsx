import AnimationWrapper from '@/components/AnimationWrapper'
import GPsUpcoming from '@/components/gp/Upcoming'
import Row from 'react-bootstrap/Row'
import GPsFinished from '@/components/gp/Finished'

export default async function GPs() {
	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				{/* @ts-expect-error Server Component */}
				<GPsFinished />
				{/* @ts-expect-error Server Component */}
				<GPsUpcoming />
			</Row>
		</AnimationWrapper>
	)
}
