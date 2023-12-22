'use client'
import SignInForm from './InForm'
import SignUpForm from './UpForm'
import { useState } from 'react'
import type { Form, SignIn, SignUp } from '@/types/Auth.types'
import ResetPasswordForm from './ResetPasswordForm'

export default function SignModal({ hideModal }: { hideModal: () => void }) {
	const [form, setForm] = useState<Form>('in')

	const _setForm = (form: Form) => {
		setForm(form)
	}

	return form === 'up' ? (
		<SignUpForm hideModal={hideModal} setForm={_setForm} />
	) : form === 'reset' ? (
		<ResetPasswordForm hideModal={hideModal} setForm={_setForm} />
	) : (
		<SignInForm hideModal={hideModal} setForm={_setForm} />
	)
}
