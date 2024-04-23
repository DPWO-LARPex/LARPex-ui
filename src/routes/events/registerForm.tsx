import { useState } from 'react'
import { RegisterFormSchema } from '@/model/events/types'
import { useNavigate } from 'react-router-dom'
import Input from '@/components/Input'

export default function RegisterForm() {
	// const { id } = useParams()
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

	const handleSubmit = () => { }

	return (
		<div className='bg-stone-900 m-12 p-12 items-center flex flex-col'>
			<h1>Wydarzenie</h1>
			<div>
				<div className='my-4'>
					<Input

						label="Imię"
						inputProps={{
							value: event.name,
							onChange: handleEventChange('name'),
						}}
					/>
				</div>
				<div className='my-4'>
					<Input
						label="Nazwisko"
						inputProps={{
							value: event.surname,
							onChange: handleEventChange('surname'),
						}}
					/>
				</div>
				<div className='my-4'>
					<Input
						label="Email"
						inputProps={{
							value: event.email,
							onChange: handleEventChange('email'),
						}}
					/>
				</div>

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