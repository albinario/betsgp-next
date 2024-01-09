'use client'
import classNames from 'classnames'
import { createNation } from '@/prisma/service'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { NationNew } from '@/types'

export default function AddNation() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<NationNew>()

	const onSubmit: SubmitHandler<NationNew> = async (data: NationNew) => {
		try {
			setIsSubmitting(true)

			await createNation(data)

			toast.success('Nation added')
		} catch (error) {
			toast.error('Something went wrong when trying to add nation')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Card>
			<CardHeader className='text-center'>Nation</CardHeader>
			<CardBody className='p-2'>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
					<Row className='g-2'>
						<Col xs={8}>
							<FormControl
								className={classNames({
									'missing-border': errors.name
								})}
								placeholder='Name'
								type='text'
								size='sm'
								{...register('name', { required: true })}
							/>
						</Col>

						<Col>
							<FormControl
								className={classNames({
									'missing-border': errors.code
								})}
								placeholder='Code'
								type='text'
								size='sm'
								{...register('code', { required: true })}
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
