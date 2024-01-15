import classNames from 'classnames'
import { Envelope } from '@/icons'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { resetPassword } from '@/supabase/service'
import type { Form as TForm, ResetPassword } from '@/types'

export default function ResetPassword({
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
	} = useForm<ResetPassword>()

	const handleResetPassword: SubmitHandler<ResetPassword> = async (
		data: ResetPassword
	) => {
		try {
			setIsSubmitting(true)

			await resetPassword(data)

			hideModal()
			toast.success('Instructions sent to ' + data.email)
		} catch (error) {
			toast.error('Something went wrong when trying to reset password')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Reset password</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Alert variant='dark'>
					The reset password link sent to your email will be valid for 1 hour,
					and needs to be used in this browser on this device
				</Alert>
				<Form
					className='d-grid gap-2'
					onSubmit={handleSubmit(handleResetPassword)}
				>
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

					<Button disabled={isSubmitting} type='submit' variant='success'>
						{isSubmitting ? 'Resetting password...' : 'Reset password'}
					</Button>
				</Form>
			</Modal.Body>

			<Modal.Footer className='d-flex justify-content-between'>
				<Button
					onClick={() => setForm('in')}
					size='sm'
					variant='outline-success'
				>
					I remember my password
				</Button>
			</Modal.Footer>
		</>
	)
}
