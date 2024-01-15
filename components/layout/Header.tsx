'use client'
import SignModal from '@/components/layout/sign/Modal'
import YearSelect from '@/components/layout/YearSelect'
import { useUser } from '@/context/UserContext'
import { Admin, SignIn } from '@/icons'
import NextLink from 'next/link'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { logo } from '@/theme'

export default function Header() {
	const [showModal, setShowModal] = useState(false)

	const user = useUser()

	const hideModal = () => {
		setShowModal(false)
	}

	return (
		<>
			<Navbar expand='md' collapseOnSelect>
				<div className='d-flex align-items-center'>
					<Navbar.Brand as={NextLink} href='/'>
						<Image alt={logo.alt} src={logo.src} width={logo.width} />
					</Navbar.Brand>
					<YearSelect />
				</div>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='d-flex align-items-center ms-auto small'>
						{user && (
							<Nav.Link as={NextLink} href={'/users/' + user.id}>
								My page
							</Nav.Link>
						)}
						<Nav.Link as={NextLink} href='/standings'>
							Standings
						</Nav.Link>
						<Nav.Link as={NextLink} href='/gps'>
							GP&apos;s
						</Nav.Link>
						<Nav.Link as={NextLink} href='/riders'>
							Riders
						</Nav.Link>
						<Nav.Link as={NextLink} href='/hall-of-fame'>
							Hall of fame
						</Nav.Link>
						<Nav.Link as={NextLink} href='/rules'>
							Rules
						</Nav.Link>
						{!user && (
							<div className='pe-0'>
								<Button
									className='d-flex align-items-center gap-1'
									onClick={() => setShowModal(true)}
									size='sm'
									variant='success'
								>
									<span style={{ fontSize: '.8em' }}>Sign in</span>
									<SignIn />
								</Button>
							</div>
						)}
						{user?.admin && (
							<>
								<Nav.Link as={NextLink} className='pe-0' href='/admin'>
									<Button
										className='d-flex align-items-center'
										size='sm'
										variant='outline-primary'
									>
										<Admin />
									</Button>
								</Nav.Link>

								<Nav.Link
									as={NextLink}
									className='pe-0'
									href='/admin/report-result'
								>
									<Button
										className='d-flex align-items-center'
										size='sm'
										variant='outline-danger'
									>
										<Admin />
									</Button>
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Modal centered onHide={() => setShowModal(false)} show={showModal}>
				<SignModal hideModal={hideModal} />
			</Modal>
		</>
	)
}
