import classNames from 'classnames'
import { Envelope, Lock } from '@/icons'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { signUpWithEmailAndPassword } from '@/supabase/service'
import type { Form as TForm, SignUp } from '@/types'

export default function SignUp({
	hideModal,
	setForm
}: {
	hideModal: () => void
	setForm: (form: TForm) => void
}) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<SignUp>()

	const handleSignUp: SubmitHandler<SignUp> = async (data: SignUp) => {
		try {
			setIsSubmitting(true)

			await signUpWithEmailAndPassword(data)

			hideModal()
			toast.success('Welcome, ' + data.firstName)
		} catch (error) {
			toast.error('Something went wrong when trying to sign in')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Sign up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(handleSignUp)}>
					<Form.Group className='d-flex gap-2'>
						<Form.Control
							className={classNames({
								'missing-border': errors.firstName
							})}
							placeholder='First name'
							type='text'
							{...register('firstName', { required: true })}
						/>
						<Form.Control
							className={classNames({
								'missing-border': errors.lastName
							})}
							placeholder='Last name'
							type='text'
							{...register('lastName', { required: true })}
						/>
					</Form.Group>

					<InputGroup>
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

					<InputGroup>
						<InputGroup.Text>
							<Lock />
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
									value: 8,
									message: 'Enter at least 8 characters'
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

					<Button disabled={isSubmitting} type='submit' variant='success'>
						{isSubmitting ? 'Signing up...' : 'Sign up'}
					</Button>
				</Form>
			</Modal.Body>

			<Modal.Footer className='d-flex justify-content-between'>
				<Button
					onClick={() => setForm('in')}
					size='sm'
					variant='outline-success'
				>
					I already have an account
				</Button>
				<Button
					className='opacity-75'
					onClick={() => setForm('reset')}
					size='sm'
					variant='outline-warning'
				>
					Reset password
				</Button>
			</Modal.Footer>
		</>
	)
}
