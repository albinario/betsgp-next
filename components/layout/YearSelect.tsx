import { getCookieYear, setCookieYear } from '@/cookies/service'
import { getCurrentYear } from '@/helpers/dateTime'
import { useState, type ReactElement, useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { toast } from 'react-toastify'

export default function YearSelect() {
	const [selectedYear, setSelectedYear] = useState<number | null>(null)

	const handleYearChange = async (year: number) => {
		try {
			await setCookieYear(year)
			setSelectedYear(year)
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
		<NavDropdown title={selectedYear || currentYear} id='basic-nav-dropdown'>
			{optionsElement}
			<NavDropdown.Divider />
			<NavDropdown.Item href=''>All time</NavDropdown.Item>
		</NavDropdown>
	)
}
