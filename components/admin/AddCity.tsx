'use client'
import classNames from 'classnames'
import type { nation } from '@prisma/client'
import { createCity } from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { CityNew } from '@/types'

export default function AddCity({ nations }: { nations: nation[] }) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<CityNew>()

	const onSubmit: SubmitHandler<CityNew> = async (data: CityNew) => {
		try {
			setIsSubmitting(true)

			const cityNew: CityNew = {
				name: data.name,
				nationId: Number(data.nationId)
			}

			await createCity(cityNew)

			toast.success('City added')
		} catch (error) {
			toast.error('Something went wrong when trying to add city')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Card>
			<Card.Header className='text-center'>City</Card.Header>
			<Card.Body className='p-2'>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
					<Form.Control
						className={classNames({
							'missing-border': errors.name
						})}
						placeholder='Name'
						type='text'
						size='sm'
						{...register('name', { required: true })}
					/>

					<Form.Select
						className={classNames({
							'missing-border': errors.nationId
						})}
						size='sm'
						{...register('nationId', { required: true })}
					>
						<option value=''>Select nation</option>
						{nations
							?.sort((a, b) => a.name.localeCompare(b.name))
							.map((nation) => (
								<option key={nation.id} value={nation.id}>
									{nation.name}
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
