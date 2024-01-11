export default function CardBodyRow({
	title,
	value
}: {
	title: string
	value?: number | string
}) {
	return (
		<div className='d-flex justify-content-between'>
			<span>{title}</span> <span>{value}</span>
		</div>
	)
}
