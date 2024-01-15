'use client'
import classNames from 'classnames'
import type { nation } from '@prisma/client'
import { createRider } from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { RiderNew } from '@/types'

export default function AddRider({ nations }: { nations: nation[] }) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<RiderNew>()

	const onSubmit: SubmitHandler<RiderNew> = async (data: RiderNew) => {
		try {
			setIsSubmitting(true)

			const riderNew: RiderNew = {
				name: data.name,
				nationId: Number(data.nationId),
				number: Number(data.number),
				active: Number(data.active),
				sub: Number(data.sub)
			}

			await createRider(riderNew)

			toast.success('Rider added')
		} catch (error) {
			toast.error('Something went wrong when trying to add rider')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Card>
			<Card.Header className='text-center'>Rider</Card.Header>
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

					<Row className='g-2'>
						<Col>
							<Form.Control
								className={classNames({
									'missing-border': errors.number
								})}
								placeholder='#'
								type='number'
								size='sm'
								{...register('number', { required: true })}
							/>
						</Col>
						<Col>
							<Form.Control
								placeholder='Active'
								type='number'
								size='sm'
								{...register('active')}
							/>
						</Col>
						<Col>
							<Form.Control
								placeholder='Sub'
								type='number'
								size='sm'
								{...register('sub')}
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
