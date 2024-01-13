'use client'
import classNames from 'classnames'
import type { city, gp, rider } from '@prisma/client'
import { assignWildCard } from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Form from 'react-bootstrap/Form'
import FormSelect from 'react-bootstrap/FormSelect'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { GP } from '@/types'

type WildCard = {
	gpId: number
	riderId: number
}

export default function AssignWildCard({
	gps,
	riders
}: {
	gps: GP[]
	riders: rider[]
}) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<WildCard>()

	const onSubmit: SubmitHandler<WildCard> = async (data: WildCard) => {
		try {
			setIsSubmitting(true)

			await assignWildCard(Number(data.gpId), Number(data.riderId))

			toast.success('Wild card assigned')
		} catch (error) {
			toast.error('Something went wrong when trying to assign wild card')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Card>
			<CardHeader className='text-center'>Wild Card</CardHeader>
			<CardBody className='p-2'>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
					<FormSelect
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
					</FormSelect>

					<FormSelect
						className={classNames({
							'missing-border': errors.riderId
						})}
						size='sm'
						{...register('riderId', { required: true })}
					>
						<option value=''>Select rider</option>
						{riders
							?.sort((a, b) => a.name.localeCompare(b.name))
							.map((rider) => (
								<option key={rider.id} value={rider.id}>
									{rider.name}
								</option>
							))}
					</FormSelect>

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
