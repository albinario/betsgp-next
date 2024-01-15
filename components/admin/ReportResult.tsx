'use client'
import Flag from '@/components/Flag'
import {
	finishGp,
	setUserStandingsPrevPos,
	sortRiderResults,
	sortUserResults,
	sortUserStandings,
	updateRiderResult,
	updateUserResults
} from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { GP, Rider, RiderResultIncoming } from '@/types'
import classNames from 'classnames'

type TForm = {
	id1: number
	points1: number
	races1: number
	id2: number
	points2: number
	races2: number
	id3: number
	points3: number
	races3: number
	id4: number
	points4: number
	races4: number
}

export default function ReportResult({
	gps,
	ridersActive
}: {
	gps: GP[]
	ridersActive: Rider[]
}) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [selectedGp, setSelectedGP] = useState<GP>(gps[0])
	const [wildCard, setWildCard] = useState<Rider | null>(gps[0].wildCard)
	const [first, setFirst] = useState(false)
	const [final, setFinal] = useState(false)

	const { handleSubmit, register, setValue } = useForm<TForm>()

	const onSubmit: SubmitHandler<TForm> = async (data: TForm) => {
		try {
			setIsSubmitting(true)

			const gpId = selectedGp.id

			const riderResultsIncoming: RiderResultIncoming[] = [
				{
					riderId: Number(data.id1),
					gpId,
					m1: final ? 1 : 0,
					m2: 0,
					m3: 0,
					points: Number(data.points1),
					races: Number(data.races1)
				},
				{
					riderId: Number(data.id2),
					gpId,
					m1: 0,
					m2: final ? 1 : 0,
					m3: 0,
					points: Number(data.points2),
					races: Number(data.races2)
				},
				{
					riderId: Number(data.id3),
					gpId,
					m1: 0,
					m2: 0,
					m3: final ? 1 : 0,
					points: Number(data.points3),
					races: Number(data.races3)
				},
				{
					riderId: Number(data.id4),
					gpId,
					m1: 0,
					m2: 0,
					m3: 0,
					points: Number(data.points4),
					races: Number(data.races4)
				}
			]

			if (!riderResultsIncoming.length) return toast.error('No riders results')

			const gpYear = selectedGp.dateTime.getFullYear()

			if (first) setUserStandingsPrevPos(gpYear)

			riderResultsIncoming
				.filter((res) => res.riderId)
				.forEach((riderResult) => {
					updateRiderResult(riderResult)
					updateUserResults(riderResult, gpYear)
				})

			sortUserResults(gpId)

			sortRiderResults(gpId)

			sortUserStandings(gpYear)

			if (final) finishGp(gpId)

			toast.success('Successful')

			setValue('id1', 0)
			setValue('id2', 0)
			setValue('id3', 0)
			setValue('id4', 0)
		} catch (error) {
			toast.error('Something went wrong when trying to update rider results')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleGPChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const gp = gps.find((gp) => gp.id === Number(event.target.value))
		if (gp) {
			setSelectedGP(gp)

			gp.wildCard ? setWildCard(gp.wildCard) : setWildCard(null)
		}
	}

	return (
		<Card>
			<Card.Header className='d-flex justify-content-between'>
				Report result
				{selectedGp && (
					<span className='d-flex align-items-center gap-2'>
						{selectedGp.id}. {selectedGp.city.name}{' '}
						<Flag height='.8em' nationCode={selectedGp.city.nation.code} />
					</span>
				)}
			</Card.Header>
			<Card.Body className='p-2'>
				<Form.Group className='d-flex justify-content-between align-items-center text-muted'>
					<Form.Switch
						checked={first}
						label='First'
						onChange={() => setFirst(!first)}
					/>
					<Form.Switch
						checked={final}
						label='Final'
						onChange={() => setFinal(!final)}
					/>
				</Form.Group>

				<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
					{[3, 2, 1, 0].map((points, index) => {
						const rider = index + 1
						return (
							<Row key={index} className='g-2'>
								<Col xs={8}>
									<Form.Select
										{...register(
											rider === 1
												? 'id1'
												: rider === 2
												? 'id2'
												: rider === 3
												? 'id3'
												: 'id4'
										)}
										className={classNames({
											goldBorder: final && rider === 1,
											silverBorder: final && rider === 2,
											bronzeBorder: final && rider === 3
										})}
										size='sm'
									>
										<option value={0}></option>
										{ridersActive.map((rider) => (
											<option key={rider.id} value={rider.id}>
												{rider.name}
											</option>
										))}
										{wildCard && (
											<option value={wildCard.id}>{wildCard.name}</option>
										)}
									</Form.Select>
								</Col>
								<Col>
									<Form.Control
										{...register(
											rider === 1
												? 'points1'
												: rider === 2
												? 'points2'
												: rider === 3
												? 'points3'
												: 'points4'
										)}
										defaultValue={points}
										placeholder='Pts'
										size='sm'
										type='number'
									/>
								</Col>
								<Col>
									<Form.Control
										{...register(
											rider === 1
												? 'races1'
												: rider === 2
												? 'races2'
												: rider === 3
												? 'races3'
												: 'races4'
										)}
										defaultValue={1}
										placeholder='Races'
										size='sm'
										type='number'
									/>
								</Col>
							</Row>
						)
					})}

					<Button
						disabled={isSubmitting || (first && final) || !selectedGp}
						size='sm'
						type='submit'
						variant='outline-success'
					>
						+
					</Button>

					<Form.Select onChange={handleGPChange} size='sm'>
						{gps.map((gp) => (
							<option key={gp.id} value={gp.id}>
								{gp.id}. {gp.city.name}
							</option>
						))}
					</Form.Select>
				</Form>
			</Card.Body>
		</Card>
	)
}
