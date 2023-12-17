'use client'
import SignModal from '../SignModal'
import useAuth from '@/hooks/useAuth'
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
import { logo } from '@/theme/config'

export default function Header() {
	const [showModal, setShowModal] = useState(false)
	const { user, signOutUser } = useAuth()

	return (
		<>
			<Navbar expand='md' collapseOnSelect sticky='top'>
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
							{!user ? (
								<Button
									onClick={() => setShowModal(true)}
									size='sm'
									variant='success'
								>
									Sign in
								</Button>
							) : (
								<Button
									onClick={() => signOutUser()}
									size='sm'
									variant='danger'
								>
									Sign out
								</Button>
							)}
						</NavLink>
					</Nav>
				</NavbarCollapse>
			</Navbar>
			<Modal centered onHide={() => setShowModal(false)} show={showModal}>
				<SignModal />
			</Modal>
		</>
	)
}
