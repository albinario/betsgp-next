import classNames from 'classnames'
import { Envelope, Lock } from '@/icons'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { signUpWithEmailAndPassword } from './service'
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
			<ModalHeader closeButton>
				<ModalTitle>Sign up</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form className='d-grid gap-2' onSubmit={handleSubmit(handleSignUp)}>
					<FormGroup className='d-flex'>
						<FormControl
							className={classNames('me-1', {
								'missing-border': errors.firstName
							})}
							placeholder='First name'
							type='text'
							{...register('firstName', { required: true })}
						/>
						<FormControl
							className={classNames('ms-1', {
								'missing-border': errors.lastName
							})}
							placeholder='Last name'
							type='text'
							{...register('lastName', { required: true })}
						/>
					</FormGroup>

					<InputGroup>
						<InputGroupText>
							<Envelope />
						</InputGroupText>
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
						<InputGroupText>
							<Lock />
						</InputGroupText>
						<FormControl
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

					<Button disabled={isSubmitting} type='submit' variant='success'>
						{isSubmitting ? 'Signing up...' : 'Sign up'}
					</Button>
				</Form>
			</ModalBody>

			<ModalFooter className='d-flex justify-content-between'>
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
			</ModalFooter>
		</>
	)
}
