'use client'
import classNames from 'classnames'
import type { nation } from '@prisma/client'
import { createRider } from '@/prisma/service'
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
			<CardHeader className='text-center'>Rider</CardHeader>
			<CardBody className='p-2'>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
					<FormControl
						className={classNames({
							'missing-border': errors.name
						})}
						placeholder='Name'
						type='text'
						size='sm'
						{...register('name', { required: true })}
					/>

					<FormSelect
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
					</FormSelect>

					<Row className='g-2'>
						<Col>
							<FormControl
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
							<FormControl
								placeholder='Active'
								type='number'
								size='sm'
								{...register('active')}
							/>
						</Col>
						<Col>
							<FormControl
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
			</CardBody>
		</Card>
	)
}
