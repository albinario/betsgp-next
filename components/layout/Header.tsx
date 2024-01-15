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
import NavbarBrand from 'react-bootstrap/NavbarBrand'
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/NavbarToggle'
import NavLink from 'react-bootstrap/NavLink'
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
					<NavbarBrand as={NextLink} href='/'>
						<Image alt={logo.alt} src={logo.src} width={logo.width} />
					</NavbarBrand>
					<YearSelect />
				</div>

				<NavbarToggle aria-controls='basic-navbar-nav' />
				<NavbarCollapse id='basic-navbar-nav'>
					<Nav className='d-flex align-items-center ms-auto small'>
						{user && (
							<NavLink as={NextLink} href={'/users/' + user.id}>
								My page
							</NavLink>
						)}
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
								<NavLink as={NextLink} className='pe-0' href='/admin'>
									<Button
										className='d-flex align-items-center'
										size='sm'
										variant='outline-primary'
									>
										<Admin />
									</Button>
								</NavLink>

								<NavLink
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
								</NavLink>
							</>
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
