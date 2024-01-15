import { getCookieYear, setCookieYear } from '@/cookies/service'
import { getCurrentYear } from '@/helpers/dateTime'
import { useState, type ReactElement, useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify'

export default function YearSelect() {
	const [selectedYear, setSelectedYear] = useState<number | null>(null)
	const [isFetching, setIsFetching] = useState(false)

	const handleYearChange = async (year: number) => {
		try {
			setIsFetching(true)
			await setCookieYear(year)
			setSelectedYear(year)

			setTimeout(() => {
				setIsFetching(false)
			}, 3000)
		} catch (error) {
			toast.error('Something went wrong when trying to select year')
		}
	}

	const currentYear = getCurrentYear()
	const optionsElement: ReactElement[] = []

	for (let year = currentYear; year >= 2020; year--) {
		optionsElement.push(
			<NavDropdown.Item key={year} onClick={() => handleYearChange(year)}>
				{String(year)}
			</NavDropdown.Item>
		)
	}

	useEffect(() => {
		const checkCookieYear = async () => {
			const cookieYear = await getCookieYear()
			if (cookieYear) setSelectedYear(cookieYear)
		}
		checkCookieYear()
	}, [])

	return (
		<>
			<NavDropdown title={selectedYear || currentYear} id='basic-nav-dropdown'>
				{optionsElement}
				{/* <NavDropdown.Divider />
			<NavDropdown.Item href=''>All time</NavDropdown.Item> */}
			</NavDropdown>
			{isFetching && (
				<Spinner
					animation='grow'
					className='ms-2'
					size='sm'
					variant='warning'
				/>
			)}
		</>
	)
}
