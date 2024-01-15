import { DateTime } from 'luxon'

export const getCurrentYear = () => {
	return new Date().getFullYear()
}

export const getDateTimeLocal = (date: Date) => {
	return DateTime.fromJSDate(date).toLocal()
}

export const getDateTimeLocalFormatted = (date: Date, short = false) => {
	return getDateTimeLocal(date).toFormat(
		short ? 'dd/MM HH:mm' : 'yyyy-MM-dd HH:mm'
	)
}

export const getNowLocal = () => {
	return DateTime.local()
}
