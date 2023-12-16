'use client'
import classNames from 'classnames'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { Envelope, User } from '@/icons'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { SignUp } from '@/types/Auth.types'

export default function SignUpForm({
	updateSign
}: {
	updateSign: (val: boolean) => void
}) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	// const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<SignUp>()

	const onSignUp: SubmitHandler<SignUp> = async (data: SignUp) => {
		try {
			setIsSubmitting(true)
			const newUser = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			)

			await fetch('api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
					uid: newUser.user.uid
				})
			})

			toast.success('Welcome, ' + data.firstName)
			// router.push('/') // TODO: update nav as soon as user pages are in place
		} catch (error) {
			if (error instanceof FirebaseError) console.error(error.message)
			toast.error('Something went wrong when trying to sign up')

			setIsSubmitting(false)
		}
	}

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Sign up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSignUp)}>
					<Form.Group className='d-flex mb-2'>
						<Form.Control
							className={classNames('me-1', {
								'missing-border': errors.firstName
							})}
							placeholder='First name'
							type='text'
							{...register('firstName', { required: true })}
						/>
						<Form.Control
							className={classNames('ms-1', {
								'missing-border': errors.lastName
							})}
							placeholder='Last name'
							type='text'
							{...register('lastName', { required: true })}
						/>
					</Form.Group>

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
							{isSubmitting ? 'Signing up...' : 'Sign up'}
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer className='d-flex justify-content-between'>
				<Button
					onClick={() => updateSign(true)}
					size='sm'
					variant='outline-success'
				>
					I already have an account
				</Button>
				<Button className='opacity-75' size='sm' variant='outline-warning'>
					Reset password
				</Button>
			</Modal.Footer>
		</>
	)
}
