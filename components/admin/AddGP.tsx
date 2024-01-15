'use client'
import classNames from 'classnames'
import type { city } from '@prisma/client'
import { createGP } from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { GPNew } from '@/types'

export default function AddGP({ cities }: { cities: city[] }) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<GPNew>()

	const onSubmit: SubmitHandler<GPNew> = async (data: GPNew) => {
		try {
			setIsSubmitting(true)

			const gpNew: GPNew = {
				cityId: Number(data.cityId),
				dateTime: new Date(data.dateTime + 'Z'),
				gp: Number(data.gp)
			}

			await createGP(gpNew)

			toast.success('GP added')
		} catch (error) {
			toast.error('Something went wrong when trying to add GP')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Card>
			<Card.Header className='text-center'>GP</Card.Header>
			<Card.Body className='p-2'>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
					<Form.Select
						className={classNames({
							'missing-border': errors.cityId
						})}
						size='sm'
						{...register('cityId', { required: true })}
					>
						<option value=''>Select city</option>
						{cities
							?.sort((a, b) => a.name.localeCompare(b.name))
							.map((city) => (
								<option key={city.id} value={city.id}>
									{city.name}
								</option>
							))}
					</Form.Select>

					<Row className='g-2'>
						<Col>
							<Form.Control
								className={classNames({
									'missing-border': errors.gp
								})}
								placeholder='#'
								type='number'
								size='sm'
								{...register('gp', { required: true })}
							/>
						</Col>

						<Col xs={9}>
							<Form.Control
								className={classNames({
									'missing-border': errors.dateTime
								})}
								type='datetime-local'
								size='sm'
								{...register('dateTime', { required: true })}
							/>
						</Col>
					</Row>

					<Button
						disabled={isSubmitting}
						size='sm'
						type='submit'
						variant='outline-success'
					>
						+
					</Button>
				</Form>
			</Card.Body>
		</Card>
	)
}
