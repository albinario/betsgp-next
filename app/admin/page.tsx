'use client'
import AnimationWrapper from '@/components/AnimationWrapper'
import ProtectedRouteAdmin from '@/components/ProtectedRouteAdmin'
import { useEffect, useState } from 'react'
import { FormControl, FormSelect } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/CardBody'
import CardHeader from 'react-bootstrap/CardHeader'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'

type City = {
	name: string
	nationId: number
}

type Nation = {
	id: number
	name: string
	code: string
}

export default function Admin() {
	const [nations, setNations] = useState<Nation[] | null>(null)

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<City>()

	const onAddCity: SubmitHandler<City> = async (data: City) => {}

	useEffect(() => {
		const getNations = async () => {
			const res = await fetch('api/nations')
			const nations: Nation[] = await res.json()
			setNations(nations)
		}
		getNations()
	}, [])

	return (
		<ProtectedRouteAdmin>
			<AnimationWrapper>
				<Row xs={1} sm={2} lg={3} xl={4} xxl={5} className='g-2'>
					<Col>
						<Card>
							<CardHeader>Add city</CardHeader>
							<CardBody>
								<Form onSubmit={handleSubmit(onAddCity)}>
									<FormControl
										placeholder='Name'
										type='text'
										{...register('name', { required: true })}
									/>
									<FormSelect>
										{nations
											?.sort((a, b) => a.name.localeCompare(b.name))
											.map((nation) => (
												<option key={nation.id} value={nation.id}>
													{nation.name}
												</option>
											))}
									</FormSelect>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</AnimationWrapper>
		</ProtectedRouteAdmin>
	)
}
