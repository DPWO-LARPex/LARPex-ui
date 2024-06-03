/* eslint-disable */

import { useState } from 'react'
import { RegisterFormSchema } from '@/model/events/types'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '@/components/Input'

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

		const response = await fetch(`/api/event/${event_id}/join`, {
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

	return (
		<div className="bg-stone-900 m-12 p-12 items-center flex flex-col">
			<h1>Wydarzenie</h1>
			<div>
				<div className="my-4">
					<Input
						label="Imię"
						inputProps={{
							value: event.name,
							onChange: handleEventChange('name'),
						}}
					/>
				</div>
				<div className="my-4">
					<Input
						label="Nazwisko"
						inputProps={{
							value: event.surname,
							onChange: handleEventChange('surname'),
						}}
					/>
				</div>
				<div className="my-4">
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
