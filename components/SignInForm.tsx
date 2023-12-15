'use client'
import classNames from 'classnames'
import { FirebaseError } from 'firebase/app'
import useAuth from '@/hooks/useAuth'
import { Envelope, User } from '@/icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { SignIn } from '@/types/Auth.types'
import { InputGroup } from 'react-bootstrap'

export default function SignInForm({
	updateSign
}: {
	updateSign: (val: boolean) => void
}) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { signInUser } = useAuth()
	const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<SignIn>()

	const onSignIn: SubmitHandler<SignIn> = async (data: SignIn) => {
		try {
			setIsSubmitting(true)
			await signInUser(data.email, data.password)
			toast.success('Welcome back ' + data.email)
			router.push('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				toast.error(error.message)
			} else {
				toast.error('Something went wrong when trying to sign in')
			}
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Sign in</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSignIn)}>
					<InputGroup className='mb-2'>
						<InputGroup.Text>
							<Envelope />
						</InputGroup.Text>
						<Form.Control
							className={classNames({
								'missing-border': errors.email
							})}
							placeholder='Email'
							type='email'
							{...register('email', { required: true })}
						/>
					</InputGroup>

					<InputGroup className='mb-2'>
						<InputGroup.Text>
							<User />
						</InputGroup.Text>
						<Form.Control
							autoComplete='new-password'
							className={classNames({
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
					</InputGroup>
					{errors.password && (
						<div className='missing-text'>
							{errors.password.message ?? 'Invalid value'}
						</div>
					)}

					<Form.Group className='d-grid'>
						<Button disabled={isSubmitting} type='submit' variant='success'>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer className='d-flex justify-content-between'>
				<Button
					onClick={() => updateSign(false)}
					size='sm'
					variant='outline-success'
				>
					I need an account
				</Button>
				<Button className='opacity-75' size='sm' variant='outline-warning'>
					Reset password
				</Button>
			</Modal.Footer>
		</>
	)
}
