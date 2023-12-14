'use client'
import NextLink from 'next/link'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { theme } from '@/theme/config'

export default function Header() {
	return (
		<Navbar bg='dark' variant='dark' expand='md'>
			<Container fluid>
				<div className='d-flex align-items-center'>
					<Navbar.Brand as={NextLink} href='/'>
						<Image alt={theme.logoAlt} src={theme.logoSrc} width={80} />
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
					<Nav className='ms-auto text-uppercase small' variant='dark'>
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
						<Nav.Link as={NextLink} href='/sign-in'>
							Sign in
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
