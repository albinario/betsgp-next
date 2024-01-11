'use client'
import SignModal from './sign/Modal'
import { useUser } from '@/context/UserContext'
import NextLink from 'next/link'
import { useState } from 'react'
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
import { signOutUser } from './sign/service'
import { logo } from '@/theme'

export default function Header() {
	const [showModal, setShowModal] = useState(false)

	const user = useUser()

	const hideModal = () => {
		setShowModal(false)
	}

	const onSignOut = async () => {
		try {
			await signOutUser()

			toast.success('Signed out')
		} catch (error) {
			toast.error('Something went wrong when trying to sign out')
		}
	}

	return (
		<>
			<Navbar expand='lg' collapseOnSelect>
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
						<NavLink as={NextLink} href='/gps'>
							GP&apos;s
						</NavLink>
						<NavLink as={NextLink} href='/riders'>
							Riders
						</NavLink>
						<NavLink as={NextLink} href='/hall-of-fame'>
							Hall of fame
						</NavLink>
						<NavLink as={NextLink} href='/rules'>
							Rules
						</NavLink>
						{user && (
							<NavLink as={NextLink} href={'/users/' + user.id}>
								My page
							</NavLink>
						)}
						<NavLink className='pe-0'>
							{!user ? (
								<Button
									onClick={() => setShowModal(true)}
									size='sm'
									variant='success'
								>
									Sign in
								</Button>
							) : (
								<Button onClick={onSignOut} size='sm' variant='danger'>
									Sign out
								</Button>
							)}
						</NavLink>
						{user?.admin && (
							<NavLink className='pe-0' href='/admin'>
								<Button size='sm'>Admin</Button>
							</NavLink>
						)}
					</Nav>
				</NavbarCollapse>
			</Navbar>
			<Modal centered onHide={() => setShowModal(false)} show={showModal}>
				<SignModal hideModal={hideModal} />
			</Modal>
		</>
	)
}
