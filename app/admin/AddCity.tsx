'use client'
import classNames from 'classnames'
import type { nation } from '@prisma/client'
import { createCity } from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import FormControl from 'react-bootstrap/FormControl'
import FormSelect from 'react-bootstrap/FormSelect'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { CityNew } from '@/types'

export default function AddCity({ nations }: { nations?: nation[] }) {
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
		<Col>
			<Card>
				<CardHeader>City</CardHeader>
				<CardBody className='p-2'>
					<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
						<FormControl
							{...register('name', { required: true })}
							className={classNames('me-1', {
								'missing-border': errors.name
							})}
							placeholder='Name'
							type='text'
							size='sm'
						/>
						<FormSelect
							{...register('nationId', { required: true })}
							className={classNames('me-1', {
								'missing-border': errors.nationId
							})}
							size='sm'
						>
							<option value=''>Select nation</option>
							{nations
								?.sort((a, b) => a.name.localeCompare(b.name))
								.map((nation) => (
									<option key={nation.id} value={nation.id}>
										{nation.name}
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
		</Col>
	)
}
