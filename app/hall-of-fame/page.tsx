import { Star } from '@/icons'
import Link from 'next/link'
import { getUserStars } from '@/prisma/service'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function HallOfFame() {
	const stars = await getUserStars()

	const years = stars.reduce<number[]>((uniqueYears, item) => {
		if (!uniqueYears.includes(item.year)) {
			uniqueYears.push(item.year)
		}
		return uniqueYears
	}, [])

	return (
		<Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className='g-2'>
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
											<Link
												href={'users/' + star.userId}
												className='ms-1'
												passHref
											>
												{star.user.firstName} {star.user.lastName}
											</Link>
										</div>
									))}
							</CardBody>
						</Card>
					</Col>
				))}
		</Row>
	)
}
