import AnimationWrapper from '@/components/AnimationWrapper'
import GPsFinished from '@/components/gp/Finished'
import GPsUpcoming from '@/components/gp/Upcoming'
import { getCookieYear } from '@/cookies/service'
import { getCurrentYear } from '@/helpers/dateTime'
import Row from 'react-bootstrap/Row'

export default async function GPsPage() {
	const cookieYear = await getCookieYear()

	const showUpcoming = !cookieYear || cookieYear === getCurrentYear()

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
				{/* @ts-expect-error Server Component */}
				<GPsFinished cookieYear={cookieYear} />
				{/* @ts-expect-error Server Component */}
				{showUpcoming && <GPsUpcoming />}
			</Row>
		</AnimationWrapper>
	)
}
