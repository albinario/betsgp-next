'use client'
import classNames from 'classnames'
import { FirebaseError } from 'firebase/app'
import useAuth from '@/hooks/useAuth'
import { Envelope } from '@/icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { Form as TForm, ResetPassword } from '@/types/Auth.types'

export default function ResetPasswordForm({
	hideModal,
	setForm
}: {
	hideModal: () => void
	setForm: (form: TForm) => void
}) {
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { resetPassword } = useAuth()
	const router = useRouter()
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<ResetPassword>()

	const onResetPassword: SubmitHandler<ResetPassword> = async (
		data: ResetPassword
	) => {
		try {
			setIsSubmitting(true)
			await resetPassword(data)

			hideModal()
			router.push('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				toast.error(error.message)
			} else {
				toast.error('Something went wrong when trying to reset password')
			}
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<ModalHeader closeButton>
				<ModalTitle>Reset password</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(onResetPassword)}>
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

					<FormGroup className='d-grid'>
						<Button disabled={isSubmitting} type='submit' variant='success'>
							{isSubmitting ? 'Resetting password...' : 'Reset password'}
						</Button>
					</FormGroup>
				</Form>
			</ModalBody>

			<ModalFooter className='d-flex justify-content-between'>
				<Button
					onClick={() => setForm('in')}
					size='sm'
					variant='outline-success'
				>
					I remember my password
				</Button>
			</ModalFooter>
		</>
	)
}
