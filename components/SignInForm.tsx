'use client'
import classNames from 'classnames'
import { FirebaseError } from 'firebase/app'
import useAuth from '@/hooks/useAuth'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { SignIn } from '@/types/Auth.types'

export default function SignInForm() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isError, setIsError] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { signInUser } = useAuth()
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors }
	} = useForm<SignIn>()

	const onSignIn: SubmitHandler<SignIn> = async (data: SignIn) => {
		console.log(data)

		setIsError(false)
		setErrorMessage(null)

		try {
			setIsSubmitting(true)
			await signInUser(data.email, data.password)
		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage('Something went wrong when trying to sign up')
			}
			setIsError(true)
			setIsSubmitting(false)
		}
	}

	return (
		<Col>
			<Card bg='dark' text='light'>
				<Card.Header>Sign in</Card.Header>
				<Card.Body>
					{isError && <Alert variant='danger'>{errorMessage}</Alert>}

					<Form onSubmit={handleSubmit(onSignIn)}>
						<Form.Control
							className={classNames('mb-2', {
								'missing-border': errors.email
							})}
							placeholder='Email'
							type='text'
							{...register('email', { required: true })}
						/>

						<Form.Control
							autoComplete='new-password'
							className={classNames('mb-2', {
								'missing-border': errors.password
							})}
							placeholder='Password'
							type='password'
							{...register('password', {
								minLength: {
									value: 6,
									message: 'Enter at least 6 characters'
								},
								required: true
							})}
						/>
						{errors.password && (
							<div className='missing-text'>
								{errors.password.message ?? 'Invalid value'}
							</div>
						)}

						<Form.Group className='d-flex justify-content-between'>
							<Form.Switch
								label='Keep me signed in'
								className='text-muted small'
								{...register('keep')}
							/>
							<div className='d-grid w-50'>
								<Button
									disabled={isSubmitting}
									size='sm'
									type='submit'
									variant='success'
								>
									{isSubmitting ? 'Signing in...' : 'Sign in'}
								</Button>
							</div>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</Col>
	)
}
