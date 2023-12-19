import { DateTime } from 'luxon'

export default function getLocalDateTime(date: Date) {
	return DateTime.fromJSDate(date).toLocal().toFormat('yyyy-MM-dd HH:mm')
}
