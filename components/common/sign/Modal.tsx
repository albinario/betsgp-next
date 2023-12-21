'use client'
import SignInForm from './InForm'
import SignUpForm from './UpForm'
import { useState } from 'react'
import type { Form, SignIn, SignUp } from '@/types/Auth.types'
import ResetPasswordForm from './ResetPasswordForm'

export default function SignModal({
	isSubmitting,
	onResetPassword,
	onSignIn,
	onSignUp
}: {
	isSubmitting: boolean
	onResetPassword: () => void
	onSignIn: (data: SignIn) => void
	onSignUp: (data: SignUp) => void
}) {
	const [form, setForm] = useState<Form>('in')

	const _setForm = (form: Form) => {
		setForm(form)
	}

	return form === 'up' ? (
		<SignUpForm
			isSubmitting={isSubmitting}
			onSignUp={onSignUp}
			setForm={_setForm}
		/>
	) : form === 'reset' ? (
		<ResetPasswordForm
			isSubmitting={isSubmitting}
			onResetPassword={onResetPassword}
			setForm={_setForm}
		/>
	) : (
		<SignInForm
			isSubmitting={isSubmitting}
			onSignIn={onSignIn}
			setForm={_setForm}
		/>
	)
}
