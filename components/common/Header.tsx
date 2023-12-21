'use client'
import SignModal from './sign/Modal'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavLink from 'react-bootstrap/NavLink'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword, signOutUser } from './sign/serverActions'
import { createClient } from '@/lib/supabase/client'
import { logo } from '@/theme'
import type { SignIn, SignUp } from '@/types/Auth.types'

export default function Header() {
	const [showModal, setShowModal] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [loadingUser, setLoadingUser] = useState(true)
	const [userId, setUserId] = useState<string | null>(null)

	const supabase = createClient()

	const onResetPassword = async () => {
		console.log('reset password')
	}

	const onSignIn = async (data: SignIn) => {
		try {
			setIsSubmitting(true)

			const userId = await signInWithEmailAndPassword(data)
			setUserId(userId)

			setShowModal(false)
			toast.success('Welcome back')
		} catch (error) {
			toast.error('Something went wrong when trying to sign in')
		} finally {
			setIsSubmitting(false)
		}
	}

	const onSignOut = async () => {
		try {
			await signOutUser()

			setUserId(null)
			toast.success('Signed out')
		} catch (error) {
			toast.error('Something went wrong when trying to sign out')
		}
	}

	const onSignUp = async (data: SignUp) => {
		console.log(data)
	}

	useEffect(() => {
		async function getUser() {
			const {
				data: { user }
			} = await supabase.auth.getUser()

			if (user) setUserId(user.id)
			setLoadingUser(false)
		}
		getUser()
	}, [])

	return (
		<>
			<Navbar expand='md' collapseOnSelect>
				<div className='d-flex align-items-center'>
					<NavbarBrand as={NextLink} href='/'>
						<Image alt={logo.alt} src={logo.src} width={logo.width} />
					</NavbarBrand>
					<NavDropdown title='2023' id='basic-nav-dropdown'>
						{[2022, 2021, 2020].map((year) => (
							<NavDropdown.Item href='' key={year}>
								{year}
							</NavDropdown.Item>
						))}
						<NavDropdown.Divider />
						<NavDropdown.Item href=''>All time</NavDropdown.Item>
					</NavDropdown>
				</div>

				<NavbarToggle aria-controls='basic-navbar-nav' />
				<NavbarCollapse id='basic-navbar-nav'>
					<Nav className='d-flex align-items-center ms-auto small text-uppercase'>
						<NavLink as={NextLink} href='/standings'>
							Standings
						</NavLink>
						<NavLink as={NextLink} href='/stats'>
							Stats
						</NavLink>
						<NavLink as={NextLink} href='/gps'>
							GP's
						</NavLink>
						<NavLink as={NextLink} href='/riders'>
							Riders
						</NavLink>
						<NavLink as={NextLink} href='/comments'>
							Comments
						</NavLink>
						<NavLink as={NextLink} href='/hall-of-fame'>
							Hall of fame
						</NavLink>
						<NavLink as={NextLink} href='/rules'>
							Rules
						</NavLink>
						<NavLink>
							{!userId ? (
								<Button
									onClick={() => setShowModal(true)}
									size='sm'
									variant='success'
								>
									{loadingUser ? 'Checking...' : 'Sign in'}
								</Button>
							) : (
								<Button onClick={onSignOut} size='sm' variant='danger'>
									{loadingUser ? 'Checking...' : 'Sign out'}
								</Button>
							)}
						</NavLink>
						{/* {user?.admin && (
							<NavLink as={NextLink} href='/admin'>
								<Button size='sm'>Admin</Button>
							</NavLink>
						)} */}
					</Nav>
				</NavbarCollapse>
			</Navbar>
			<Modal centered onHide={() => setShowModal(false)} show={showModal}>
				<SignModal
					isSubmitting={isSubmitting}
					onResetPassword={onResetPassword}
					onSignIn={onSignIn}
					onSignUp={onSignUp}
				/>
			</Modal>
		</>
	)
}
