import AnimationWrapper from '@/components/AnimationWrapper'
import { Star } from '@/icons'
import Link from 'next/link'
import { getUserStars } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function HallOfFamePage() {
	const stars = await getUserStars()
	if (!stars) return <></>

	const years = stars.reduce<number[]>((uniqueYears, item) => {
		if (!uniqueYears.includes(item.year)) {
			uniqueYears.push(item.year)
		}
		return uniqueYears
	}, [])

	return (
		<AnimationWrapper>
			<Row xs={1} sm={2} md={3} lg={4} className='g-2 text-center'>
				{years
					.sort((a, b) => b - a)
					.map((year) => (
						<Col key={year}>
							<Card>
								<CardHeader>{year}</CardHeader>
								<CardBody>
									{stars
										.filter((s) => s.year === year)
										.map((star) => (
											<div className='d-flex align-items-center' key={star.id}>
												<Star type={star.type} width={20} />
												<Link href={'users/' + star.userId} className='ms-1'>
													{star.user.firstName} {star.user.lastName}
												</Link>
											</div>
										))}
								</CardBody>
							</Card>
						</Col>
					))}
			</Row>
		</AnimationWrapper>
	)
}
