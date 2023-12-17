'use client'
import SignModal from '../SignModal'
import useAuth from '@/hooks/useAuth'
import NextLink from 'next/link'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import { logo } from '@/theme/config'

export default function Header() {
	const [showModal, setShowModal] = useState(false)
	const { user, signOutUser } = useAuth()

	return (
		<>
			<Navbar expand='md' collapseOnSelect sticky='top'>
				<div className='d-flex align-items-center'>
					<Navbar.Brand as={NextLink} href='/'>
						<Image alt={logo.alt} src={logo.src} width={logo.width} />
					</Navbar.Brand>
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

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='d-flex align-items-center ms-auto small text-uppercase'>
						<Nav.Link as={NextLink} href='/standings'>
							Standings
						</Nav.Link>
						<Nav.Link as={NextLink} href='/stats'>
							Stats
						</Nav.Link>
						<Nav.Link as={NextLink} href='/gps'>
							GP's
						</Nav.Link>
						<Nav.Link as={NextLink} href='/riders'>
							Riders
						</Nav.Link>
						<Nav.Link as={NextLink} href='/comments'>
							Comments
						</Nav.Link>
						<Nav.Link as={NextLink} href='/hall-of-fame'>
							Hall of fame
						</Nav.Link>
						<Nav.Link as={NextLink} href='/rules'>
							Rules
						</Nav.Link>
						<Nav.Link>
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
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Modal centered onHide={() => setShowModal(false)} show={showModal}>
				<SignModal />
			</Modal>
		</>
	)
}
