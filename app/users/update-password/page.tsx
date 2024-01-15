'use client'
import classNames from 'classnames'
import AnimationWrapper from '@/components/AnimationWrapper'
import { Lock } from '@/icons'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { toast } from 'react-toastify'
import { updatePassword } from '@/supabase/service'
import type { UpdatePassword } from '@/types'

export default function UpdatePasswordPage() {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<UpdatePassword>()

	const handleUpdatePassword: SubmitHandler<UpdatePassword> = async (
		data: UpdatePassword
	) => {
		try {
			setIsSubmitting(true)

			await updatePassword(data)

			toast.success('Password updated')
		} catch (error) {
			toast.error('Something went wrong when trying to update password')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AnimationWrapper>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Header>Update password</Card.Header>
						<Card.Body className='p-2'>
							<Form
								className='d-grid gap-2'
								onSubmit={handleSubmit(handleUpdatePassword)}
							>
								<InputGroup>
									<InputGroup.Text>
										<Lock />
									</InputGroup.Text>
									<Form.Control
										className={classNames({
											'missing-border': errors.passwordNew
										})}
										placeholder='New password'
										type='password'
										{...register('passwordNew', { required: true })}
									/>
								</InputGroup>

								<Button disabled={isSubmitting} type='submit' variant='success'>
									{isSubmitting ? 'Updating password...' : 'Update password'}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</AnimationWrapper>
	)
}
