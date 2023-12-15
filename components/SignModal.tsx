'use client'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { useState } from 'react'

export default function SignModal() {
	const [signingIn, setSigningIn] = useState(true)

	const updateSign = (val: boolean) => {
		setSigningIn(val)
	}

	return signingIn ? (
		<SignInForm updateSign={updateSign} />
	) : (
		<SignUpForm updateSign={updateSign} />
	)
}
