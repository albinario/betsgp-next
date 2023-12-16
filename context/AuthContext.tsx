'use client'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User
} from 'firebase/auth'
import { auth } from '../firebase/config'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { SignIn, SignUp } from '@/types/Auth.types'

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextType = {
	signInUser: (data: SignIn) => void
	signOutUser: () => void
	signUpUser: (data: SignUp) => void
	user: User | null
}

export const AuthContextProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<Boolean>(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
			} else {
				setUser(null)
			}
		})
		setLoading(false)
		return unsubscribe
	}, [])

	const signInUser = (data: SignIn) =>
		signInWithEmailAndPassword(auth, data.email, data.password)

	const signOutUser = async () => {
		setUser(null)
		await signOut(auth)
		toast.success('Signed out')
		return
	}

	const signUpUser = async (data: SignUp) => {
		const newUser = await createUserWithEmailAndPassword(
			auth,
			data.email,
			data.password
		)

		await fetch('api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				uid: newUser.user.uid
			})
		})
	}

	return (
		<AuthContext.Provider value={{ signInUser, signOutUser, signUpUser, user }}>
			{loading ? null : children}
		</AuthContext.Provider>
	)
}
