'use client'
import classNames from 'classnames'
import type { city } from '@prisma/client'
import { createGP } from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormSelect from 'react-bootstrap/FormSelect'
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
			<CardHeader className='text-center'>GP</CardHeader>
			<CardBody className='p-2'>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
					<FormSelect
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
					</FormSelect>

					<Row className='g-2'>
						<Col>
							<FormControl
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
							<FormControl
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
			</CardBody>
		</Card>
	)
}
