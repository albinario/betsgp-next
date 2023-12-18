'use client'
import classNames from 'classnames'
import { FirebaseError } from 'firebase/app'
import useAuth from '@/hooks/useAuth'
import { Envelope, User } from '@/icons'
import { useRouter } from 'next/navigation'
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
import type { Form as TForm, SignIn } from '@/types/Auth.types'

export default function SignInForm({
	setForm
}: {
	setForm: (form: TForm) => void
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
			await signInUser(data)

			router.push('hall-of-fame') // TODO: update route
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
			<ModalHeader closeButton>
				<ModalTitle>Sign in</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(onSignIn)}>
					<InputGroup className='mb-2'>
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

					<InputGroup className='mb-2'>
						<InputGroupText>
							<User />
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

					<FormGroup className='d-grid'>
						<Button disabled={isSubmitting} type='submit' variant='success'>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
						</Button>
					</FormGroup>
				</Form>
			</ModalBody>

			<ModalFooter className='d-flex justify-content-between'>
				<Button
					onClick={() => setForm('up')}
					size='sm'
					variant='outline-success'
				>
					I need an account
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
