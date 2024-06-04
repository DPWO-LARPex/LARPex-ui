/* eslint-disable */

import { useEffect, useState } from 'react'
import { EventCharacters, RegisterFormSchema } from '@/model/events/types'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '@/components/Input'
import { useQuery } from '@tanstack/react-query'

enum Step {
	Form,
	Character,
}

export default function RegisterForm() {
	const [step, setStep] = useState<Step>(Step.Form)
	const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
		null,
	)
	const { id } = useParams()
	const characters = useQuery<EventCharacters[]>({
		queryKey: [`api/characters/${id}`],
	})
	const navigator = useNavigate()
	const selectedCharacter = characters.data
		? characters.data?.find(
				({ character_id }) => character_id === selectedCharacterId,
			)
		: null

	const [bio, setBio] = useState<string>(selectedCharacter?.bio ?? '')

	useEffect(() => {
		if (!selectedCharacterId) return

		setBio(selectedCharacter?.bio ?? '')
	}, [selectedCharacterId])

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

	const handleFormSubmit = async () => {
		const errors = validateInput()

		if (errors.length > 0) {
			// Set the errors state
			setErrors(errors)
			return
		}
		setStep(Step.Character)
	}

	return (
		<div className="bg-stone-900 m-12 p-12 items-center flex flex-col">
			<h1 className="pb-4">Wydarzenie</h1>
			{step === Step.Character ? (
				<>
					<div className="flex w-full justify-center flex-col gap-4 items-center	">
						<select
							defaultValue=""
							value={selectedCharacterId ? selectedCharacterId?.toString() : ''}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
								setSelectedCharacterId(Number(e.target.value))
							}
							className="select select-bordered w-full max-w-xs"
						>
							<option disabled selected value="">
								----
							</option>
							{characters.data?.map(character => (
								<option
									key={character.character_id}
									value={character.character_id}
								>
									{character.name}
								</option>
							))}
						</select>
						<textarea
							className="textarea textarea-bordered w-full max-w-xs min-h-80"
							placeholder="Bio"
							value={bio}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
								setBio(e.target.value)
							}
						/>
						<div className="flex gap-3 justify-center">
							<button
								className="btn bg-white text-black"
								onClick={() => {
									setStep(Step.Form)
								}}
							>
								Cofnij
							</button>
							<button
								className="btn bg-red-600 text-white"
								onClick={handleFormSubmit}
							>
								Zapłać
							</button>
						</div>
					</div>
				</>
			) : (
				<>
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
						<button
							className="btn bg-red-600 text-white"
							onClick={handleFormSubmit}
						>
							Dalej
						</button>
					</div>
				</>
			)}
		</div>
	)
}
