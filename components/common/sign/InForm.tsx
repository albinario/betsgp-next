import classNames from 'classnames'
import { Envelope, User } from '@/icons'
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
import type { Form as TForm, SignIn } from '@/types/Auth.types'

export default function SignInForm({
	isSubmitting,
	onSignIn,
	setForm
}: {
	isSubmitting: boolean
	onSignIn: (data: SignIn) => void
	setForm: (form: TForm) => void
}) {
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<SignIn>()

	const handleSignIn: SubmitHandler<SignIn> = async (data: SignIn) =>
		onSignIn(data)

	return (
		<>
			<ModalHeader closeButton>
				<ModalTitle>Sign in</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(handleSignIn)}>
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
