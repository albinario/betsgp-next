import classNames from 'classnames'
import { Envelope } from '@/icons'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { resetPassword } from './service'
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
			<ModalHeader closeButton>
				<ModalTitle>Reset password</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form
					className='d-grid gap-2'
					onSubmit={handleSubmit(handleResetPassword)}
				>
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

					<Button disabled={isSubmitting} type='submit' variant='success'>
						{isSubmitting ? 'Resetting password...' : 'Reset password'}
					</Button>
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
