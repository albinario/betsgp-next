'use client'
import classNames from 'classnames'
import { Envelope } from '@/icons'
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
import type { Form as TForm, ResetPassword } from '@/types/Auth.types'

export default function ResetPasswordForm({
	isSubmitting,
	onResetPassword,
	setForm
}: {
	isSubmitting: boolean
	onResetPassword: () => void
	setForm: (form: TForm) => void
}) {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<ResetPassword>()

	const handleResetPassword: SubmitHandler<ResetPassword> = async (
		data: ResetPassword
	) => onResetPassword()

	return (
		<>
			<ModalHeader closeButton>
				<ModalTitle>Reset password</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(handleResetPassword)}>
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
