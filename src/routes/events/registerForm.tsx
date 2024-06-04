/* eslint-disable */

import { useState } from 'react'
import { EventPostSchema, RegisterFormSchema } from '@/model/events/types'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '@/components/Input'
import { useQuery } from '@tanstack/react-query'

type EventStatus = {
	id: string
	name: 'not_started' | 'ongoing' | 'paused' | 'ended'
}

const getEventStatus = (status: EventStatus['name'] | undefined) => {
	switch (status) {
		case 'ongoing':
			return { children: 'W trakcie', color: 'bg-green-500' }
		case 'paused':
			return { children: 'Wstrzymane', color: 'bg-yellow-500' }
		case 'ended':
			return { children: 'Zakończone', color: 'bg-red-500' }
		case 'not_started':
		default:
			return { children: 'Niezaczęte', color: 'bg-gray-500' }
	}
}

export default function RegisterForm() {
	const { event_id } = useParams()
	const navigator = useNavigate()

	const handleEventChange =
		(field: keyof RegisterFormSchema) =>
			(
				e: React.ChangeEvent<
					HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
				>,
			) => {
				const { value } = e.target
				setEvent(prev => ({ ...prev, [field]: value }))
			}

	const [event, setEvent] = useState<RegisterFormSchema>({
		name: '',
		surname: '',
		email: '',
	})

	const [errors, setErrors] = useState<string[]>([])

	const validateInput = () => {
		const errors = []

		if (!event.name) {
			errors.push('Name is required')
		}

		if (!event.surname) {
			errors.push('Surname is required')
		}

		if (!event.email) {
			errors.push('Email is required')
		} else if (!/\S+@\S+\.\S+/.test(event.email)) {
			errors.push('Email is invalid')
		}

		return errors
	}

	const handleSubmit = async () => {
		const errors = validateInput()

		if (errors.length > 0) {
			// Set the errors state
			setErrors(errors)
			return
		}

		const response = await fetch(`/api/event/${event_id}/sign_up`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(event),
		})

		if (!response.ok) {
			console.error('Failed to post data')
			return
		}

		navigator('/payment')
	}

	const { data: eventData } = useQuery<EventPostSchema>({
		queryKey: ['api/event', event_id],
	})


	const eventStatusQuery = useQuery<EventStatus>({
		queryKey: ['api/event_status', eventData?.id_status],
		enabled: Boolean(event),
	})
	const eventStatus = getEventStatus(eventStatusQuery.data?.name)


	return (
		<div className="bg-stone-900 m-12 p-12 items-center flex flex-col">
			<img className="w-full h-[200px]" src={eventData?.icon} alt={eventData?.icon} />
			<div className="my-4 flex gap-2 p-3 bg-slate-800">
				Status: <span>{eventStatus?.children}</span>{' '}
				<div className={`${eventStatus?.color}  w-6 h-6 rounded-full`} />
			</div>
			<div className='my-4 flex flex-col gap-4'>
				<div className="flex justify-center gap-10">
					<Input
						label="Imię"
						inputProps={{
							value: event.name,
							onChange: handleEventChange('name'),
						}}
					/>
					<Input
						label="Nazwisko"
						inputProps={{
							value: event.surname,
							onChange: handleEventChange('surname'),
						}}
					/>
				</div>
				<div className="flex justify-center w-full">
					<Input
						label="Email"
						inputProps={{
							value: event.email,
							onChange: handleEventChange('email'),
						}}
					/>

				</div>
			</div>
			<div>
				{errors.map((error, index) => (
					<p key={index} style={{ color: 'red' }}>
						{error}
					</p>
				))}
			</div>
			<div className="flex gap-3 justify-center">
				<button
					className="btn bg-white text-black"
					onClick={() => {
						navigator('/events')
					}}
				>
					Anuluj
				</button>
				<button className="btn bg-red-600 text-white" onClick={handleSubmit}>
					Zapłać
				</button>
			</div>
		</div>
	)
}
