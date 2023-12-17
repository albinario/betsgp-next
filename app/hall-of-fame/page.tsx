import { Star } from '@/icons'
import prisma from '../../lib/prismaClient'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import Link from 'next/link'

export default async function HallOfFame() {
	const stars = await prisma.userStar.findMany({
		include: {
			user: true
		}
	})

	const years = stars.reduce<number[]>((acc, item) => {
		if (!acc.includes(item.year)) {
			acc.push(item.year)
		}
		return acc
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
										<div className='d-flex align-items-center'>
											<Star type={star.type} width={20} />
											<Link
												href={`api/users/${star.userId}`}
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
