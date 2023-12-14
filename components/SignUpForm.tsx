'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { SignUp } from '@/types/Auth.types'
import Form from 'react-bootstrap/Form'

export default function SignUpForm() {
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors }
	} = useForm<SignUp>()

	const onSignUp: SubmitHandler<SignUp> = async (data: SignUp) => {
		console.log('signed up', data)
	}

	return (
		<Form onSubmit={handleSubmit(onSignUp)}>
			<Form.Group controlId='firstName'>
				<Form.Control
					placeholder='First name'
					type='text'
					{...register('firstName', { required: 'First name missing' })}
				/>
				{errors.firstName && (
					<span>{errors.firstName.message ?? 'Invalid value'}</span>
				)}
			</Form.Group>

			<Form.Group controlId='lastName'>
				<Form.Control
					placeholder='Last name'
					type='text'
					{...register('lastName', { required: 'Last name missing' })}
				/>
				{errors.lastName && (
					<span>{errors.lastName.message ?? 'Invalid value'}</span>
				)}
			</Form.Group>
		</Form>
	)
}
