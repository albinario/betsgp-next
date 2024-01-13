import { DateTime } from 'luxon'

export const getCurrentYear = () => {
	return new Date().getFullYear()
}

export const getDateTimeLocal = (date: Date, short = false) => {
	return DateTime.fromJSDate(date)
		.toLocal()
		.toFormat(short ? 'dd/MM HH:mm' : 'yyyy-MM-dd HH:mm')
}

export const getNow = () => {}
