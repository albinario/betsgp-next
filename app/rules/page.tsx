import AnimationWrapper from '@/components/AnimationWrapper'
import CardBodyRow from '@/components/CardBodyRow'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import CardText from 'react-bootstrap/CardText'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default async function Rules() {
	return (
		<AnimationWrapper>
			<Row xs={1} md={2} lg={3} className='g-2'>
				<Col>
					<Card>
						<CardHeader>Bet SGP</CardHeader>
						<CardBody>
							<CardText>Pick 3 riders in each Grand Prix</CardText>
							<CardText>
								Collect the points that your 3 riders take in each Grand Prix
							</CardText>
							<CardText>
								You can change your picked riders as many times as you like, up
								until the start of each Grand Prix
							</CardText>
							<CardText>
								All rider points are calculated by race points, and NOT
								following the official Grand Prix point structure
							</CardText>
							<CardText>
								Bets placed after first start will be disqualified, date and
								time of placed bets are stored in the{' '}
								<Link href='/activity' className='highlight'>
									activity log
								</Link>
							</CardText>
						</CardBody>
					</Card>
				</Col>
				<Col>
					<Card>
						<CardHeader>Race points</CardHeader>
						<CardBody>
							<div className='mb-3'>
								<CardBodyRow title={'Winner'} value={'3 pts'} />
								<CardBodyRow title={'2nd'} value={'2 pts'} />
								<CardBodyRow title={'3rd'} value={'1 pts'} />
								<CardBodyRow title={'4th'} value={'0 pts'} />
							</div>
							<CardText className='small'>
								This includes all qualifying races, semifinals and final
							</CardText>
						</CardBody>
					</Card>
				</Col>
				<Col>
					<Card>
						<CardHeader>Standings sorting order</CardHeader>
						<CardBody>
							<CardBodyRow title={'1'} value={'Total points'} />
							<CardBodyRow title={'2'} value={'Gold medals'} />
							<CardBodyRow title={'3'} value={'Silver medals'} />
							<CardBodyRow title={'4'} value={'Bronze medals'} />
							<CardBodyRow title={'5'} value={'Finished races'} />
						</CardBody>
					</Card>
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
