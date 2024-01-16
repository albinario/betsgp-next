'use client'
import classNames from 'classnames'
import { createRiderResult } from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { GP } from '@/types'

type TForm = {
	gpId: number
}

export default function PopulateRiderResults({
	gps,
	riderIds
}: {
	gps: GP[]
	riderIds: number[]
}) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<TForm>()

	const onSubmit: SubmitHandler<TForm> = async (data: TForm) => {
		try {
			setIsSubmitting(true)

			const gpId = Number(data.gpId)
			const wildCardId = gps.find((gp) => gp.id === gpId)?.wildCardId
			if (wildCardId) riderIds.push(wildCardId)

			riderIds.forEach((riderId) => createRiderResult(gpId, riderId))

			toast.success('Created rider results')
		} catch (error) {
			toast.error('Something went wrong when trying to create rider results')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Card>
			<Card.Header className='text-center'>Create rider results</Card.Header>
			<Card.Body className='p-2'>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
					<Form.Select
						className={classNames({
							'missing-border': errors.gpId
						})}
						size='sm'
						{...register('gpId', { required: true })}
					>
						<option value=''>Select GP</option>
						{gps.map((gp) => (
							<option key={gp.id} value={gp.id}>
								{gp.city.name}
							</option>
						))}
					</Form.Select>

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
