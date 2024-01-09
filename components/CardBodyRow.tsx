export default function CardBodyRow({
	title,
	value
}: {
	title: string
	value: number | string | null
}) {
	return (
		<div className='d-flex justify-content-between'>
			<span>{title}</span> <span>{value}</span>
		</div>
	)
}
