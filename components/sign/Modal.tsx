'use client'
import SignInForm from './InForm'
import SignUpForm from './UpForm'
import { useState } from 'react'
import type { Form } from '@/types/Auth.types'
import ResetPasswordForm from './ResetPasswordForm'

export default function SignModal() {
	const [form, setForm] = useState<Form>('in')

	const _setForm = (form: Form) => {
		setForm(form)
	}

	return form === 'up' ? (
		<SignUpForm setForm={_setForm} />
	) : form === 'reset' ? (
		<ResetPasswordForm setForm={_setForm} />
	) : (
		<SignInForm setForm={_setForm} />
	)
}
