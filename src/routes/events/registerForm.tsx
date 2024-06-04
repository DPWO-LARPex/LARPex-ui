/* eslint-disable */

import { useState } from 'react'
import { EventPostSchema } from '@/model/events/types'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '@/components/Input'
import { useMutation, useQuery } from '@tanstack/react-query'
import { EventStatus, getEventStatus } from './eventDetails'
import { EventFormSign, signUp } from '@/model/events'
import { usePayment } from '@/context/PaymentContext'

export default function RegisterForm() {
	const { id } = useParams()
	const navigator = useNavigate()
	const { dispatch } = usePayment()
	const eventQuery = useQuery<EventPostSchema>({
		queryKey: ['api/event', id],
	})
	const eventData = eventQuery.data
	const eventStatusQuery = useQuery<EventStatus>({
		queryKey: ['api/event_status', eventData?.id_status],
		enabled: Boolean(eventData),
	})

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

	const [event, setEvent] = useState<Omit<EventFormSign, 'payment_id'>>({
		firstname: '',
		lastname: '',
		email: '',
		character_id: 2,
	})

	const eventStatus = getEventStatus(eventStatusQuery.data?.name)

	const eventSaveMutation = useMutation({
		mutationFn: signUp,
	})

	const handleSubmit = async (payment_id: number) => {
		eventSaveMutation.mutate({
			event: { ...event, payment_id },
			id: id!,
		})
	}

	const moveToPayment = () => {
		dispatch({
			type: 'setPaymentSetup',
			payload: {
				data: {
					amount: eventData?.price_buy_in || 0,
					payment_target: 'event',
					payment_target_id: Number(id),
					payment_method_id: 1,
					user_id: 1,
					date: new Date().toISOString(),
				},
				actionCallback: handleSubmit,
			},
		})
		navigator('/payments')
	}

	return (
		<div className="bg-stone-900 m-12 p-12 items-center flex flex-col">
			<h1>{`Wydarzenie`}</h1>
			<div>
				<div className="flex gap-2 p-3 bg-slate-800">
					Status: <span>{eventStatus?.children}</span>{' '}
					<div className={`${eventStatus?.color}  w-6 h-6 rounded-full`} />
				</div>
				<div className="my-4">
					<Input
						label="Imię"
						inputProps={{
							value: event.firstname,
							onChange: handleEventChange('firstname'),
						}}
					/>
				</div>
				<div className="my-4">
					<Input
						label="Nazwisko"
						inputProps={{
							value: event.lastname,
							onChange: handleEventChange('lastname'),
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
			<div className="flex gap-3 justify-center">
				<button
					className="btn bg-white text-black"
					onClick={() => {
						navigator('/events')
					}}
				>
					Anuluj
				</button>
				<button className="btn bg-red-600 text-white" onClick={moveToPayment}>
					Zapłać
				</button>
			</div>
		</div>
	)
}
