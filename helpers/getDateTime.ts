import { DateTime } from 'luxon'

export default function getDateTimeLocal(date: Date, short = false) {
	return DateTime.fromJSDate(date)
		.toLocal()
		.toFormat(short ? 'dd/MM HH:mm' : 'yyyy-MM-dd HH:mm')
}
