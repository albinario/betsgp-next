'use client'
import classNames from 'classnames'
import Flag from '@/components/Flag'
import { addUserPick, getUserPick } from '@/prisma/service'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormSelect from 'react-bootstrap/FormSelect'
import InputGroup from 'react-bootstrap/InputGroup'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import type { GP, Rider, UserPickAdd } from '@/types'

type Picks = {
	pick1Id: number
	pick2Id: number
	pick3Id: number
}

export default function PickRiders({
	gp,
	riders,
	userId
}: {
	gp: GP
	riders: Rider[]
	userId: number
}) {
	const [hasPicked, setHasPicked] = useState(false)
	const [hasUpdated, setHasUpdated] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [nationCodes, setNationCodes] = useState<string[]>([])

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors }
	} = useForm<Picks>()

	useEffect(() => {
		const checkPicks = async () => {
			const userPick = await getUserPick(gp.id, userId)

			if (userPick) {
				setValue('pick1Id', userPick.pick1Id)
				setValue('pick2Id', userPick.pick2Id)
				setValue('pick3Id', userPick.pick3Id)

				setNationCodes([
					userPick.pick1.nation.code,
					userPick.pick2.nation.code,
					userPick.pick3.nation.code
				])
				setHasPicked(true)
			}
		}
		checkPicks()
	}, [gp.id, userId, setValue])

	const allRiders: Rider[] = gp.wildCard ? [...riders, gp.wildCard] : riders

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		setHasUpdated(true)

		const selectedRiderId = Number(event.target.value)

		if (!selectedRiderId) {
			const newNationCodes = [...nationCodes]
			newNationCodes[index] = ''
			setNationCodes(newNationCodes)
			return
		}

		const selectedRider = allRiders.find(
			(rider) => rider.id === selectedRiderId
		)

		if (selectedRider) {
			const newNationCodes = [...nationCodes]
			newNationCodes[index] = selectedRider.nation.code
			setNationCodes(newNationCodes)
		}
	}

	const onSubmit: SubmitHandler<Picks> = async (data: Picks) => {
		if (
			data.pick1Id == data.pick2Id ||
			data.pick1Id == data.pick3Id ||
			data.pick2Id == data.pick3Id
		) {
			return toast.error('Duplicate picks')
		}

		try {
			setIsSubmitting(true)

			const picks: UserPickAdd = {
				gpId: gp.id,
				userId,
				pick1Id: Number(data.pick1Id),
				pick2Id: Number(data.pick2Id),
				pick3Id: Number(data.pick3Id)
			}

			await addUserPick(picks, gp.dateTime.getFullYear())

			setHasPicked(true)
			setHasUpdated(false)

			toast.success('Riders picked')
		} catch (error) {
			toast.error('Something went wrong when trying to pick riders')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form className='d-grid gap-2' onSubmit={handleSubmit(onSubmit)}>
			{[1, 2, 3].map((pick) => (
				<InputGroup key={pick}>
					<InputGroupText>
						{nationCodes[pick - 1] && (
							<Flag height='.7em' nationCode={nationCodes[pick - 1]} />
						)}
					</InputGroupText>
					<FormSelect
						{...register(
							pick === 1 ? 'pick1Id' : pick === 2 ? 'pick2Id' : 'pick3Id',
							{ required: true }
						)}
						className={classNames({
							'missing-border':
								pick === 1
									? errors.pick1Id
									: pick === 2
									? errors.pick2Id
									: errors.pick3Id
						})}
						onChange={(e) => handleSelectChange(e, pick - 1)}
						size='sm'
					>
						<option value=''>Select pick {pick}</option>
						{allRiders.map((rider) => (
							<option key={rider.id} value={rider.id}>
								{rider.name}
							</option>
						))}
					</FormSelect>
				</InputGroup>
			))}

			<Button
				disabled={isSubmitting || !hasUpdated}
				size='sm'
				type='submit'
				variant='outline-success'
			>
				{hasPicked ? 'Update picks' : 'Pick Riders'}
			</Button>
		</Form>
	)
}
