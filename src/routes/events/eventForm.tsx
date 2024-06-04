import { useEffect, useState } from 'react'
import { EventPostSchema } from '@/model/events/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlaceGetSchema } from '@/model/places/types'
import Input, { Label } from '@/components/Input'
import { formatCurrencyAmount } from '@/utils'

import { sendEvent } from '@/model/events'
import { useNavigate, useParams } from 'react-router-dom'
import { usePayment } from '@/context/PaymentContext'
import dayjs from 'dayjs'
import PaymentMethod from '@/components/PaymentMethod'

const PRICE = 500
const USER_ID = 1

export default function EventForm() {
	const { id } = useParams()
	const isEditMode = Boolean(id)
	const eventQuery = useQuery<EventPostSchema>({
		queryKey: ['api/event', id],
		enabled: isEditMode,
	})
	useEffect(() => {
		if (eventQuery.data) {
			setEvent({
				...eventQuery.data,
				date: dayjs(eventQuery.data.date).format('YYYY-MM-DD'),
			})
			setTime(dayjs(eventQuery.data.date).format('HH:mm'))
		}
	}, [eventQuery.data])
	const placesQuery = useQuery<PlaceGetSchema[]>({ queryKey: ['api/place'] })

	const queryClient = useQueryClient()
	const [event, setEvent] = useState<EventPostSchema>({
		client_description: '',
		date: '',
		icon: '',
		id_place: 1,
		id_status: 0,
		id_user: USER_ID,
		players_count: 10,
		price_buy_in: 0,
		price_org: PRICE,
		tech_desc: '',
	})
	const navigator = useNavigate()
	const [paymentId, setPaymentId] = useState<number>(0)
	const [time, setTime] = useState<string>('')
	const mutation = useMutation({
		mutationFn: sendEvent,
		onSuccess: res => {
			queryClient.invalidateQueries({ queryKey: ['api/event'] })
			if (isEditMode) {
				navigator('/events')
				return
			}
			dispatch({
				type: 'setPaymentSetup',
				payload: {
					event_id: res.id,
					payment_method_id: paymentId,
					user_id: event.id_user,
					amount: PRICE,
					date: new Date().toISOString(),
				},
			})
			navigator('/payments')
		},
	})

	const { dispatch } = usePayment()

	const handleEventChange =
		(field: keyof EventPostSchema) =>
		(
			e: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>,
		) => {
			const { value } = e.target
			setEvent(prev => ({ ...prev, [field]: value }))
		}

	const handleSubmit = () => {
		const [hours, minutes] = (time ?? '00:00').split(':')
		mutation.mutate({
			event: {
				...event,
				date: dayjs(event.date).hour(+hours).minute(+minutes).toISOString(),
			},
			id,
		})
	}

	return (
		<div className="my-12 px-28 py-12 flex flex-col gap-3">
			<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
				{event.icon ? (
					<img
						src={event.icon}
						alt="Game"
						className="object-cover h-full w-full"
					/>
				) : (
					<p className="text-center text-gray-500">
						Wprowadź adres URL w polu wejściowym, aby wyświetlić odpowiadający
						obraz.
					</p>
				)}
			</div>
			<div className="flex flex-row flex-1 justify-between gap-8">
				<div className="flex flex-col flex-1 gap-5">
					<div className=" flex justify-between">
						<Input
							label="URL ikony"
							inputProps={{
								value: event.icon,
								onChange: handleEventChange('icon'),
							}}
						/>
						<Input
							label="Data"
							inputProps={{
								type: 'date',
								value: event.date,
								onChange: handleEventChange('date'),
							}}
						/>
					</div>
					<div className=" flex justify-between">
						<Input
							label="Czas rozpoczęcia"
							inputProps={{
								type: 'time',
								value: time,
								onChange: e => {
									setTime(e.target.value)
								},
							}}
						/>
						<div className="flex flex-col gap-3">
							<Label label="Adres" />
							<select
								className="select w-full max-w-xs"
								value={event.id_place}
								onChange={handleEventChange('id_place')}
							>
								<option value={-1} disabled>
									Wybierz miejsce
								</option>
								{placesQuery.data?.map(place => (
									<option key={place.id} value={place.id}>
										{place.street}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className=" flex justify-between">
						<div className="flex flex-col gap-3">
							<Label label="Opis dla klienta" />
							<textarea
								className="textarea"
								value={event.client_description}
								onChange={handleEventChange('client_description')}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label label="Opis techniczny" />
							<textarea
								className="textarea"
								value={event.tech_desc}
								onChange={handleEventChange('tech_desc')}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-1 gap-5">
					<Input
						label="Cena za gre (1 gracz)"
						inputProps={{
							type: 'number',
							value: event.price_buy_in.toString(),
							onChange: handleEventChange('price_buy_in'),
						}}
					/>
					{!isEditMode ? (
						<>
							<div>
								<Label label="Cena za organizacje" />
								<p>{formatCurrencyAmount(PRICE)}</p>
							</div>

							<PaymentMethod
								paymentId={paymentId}
								setPaymentId={setPaymentId}
							/>
						</>
					) : null}
				</div>
			</div>
			<div className="flex gap-3 justify-center">
				<button
					className="btn btn-tertiary"
					onClick={() => {
						navigator('/events')
					}}
				>
					Anuluj
				</button>
				<button className="btn btn-primary" onClick={handleSubmit}>
					{isEditMode ? 'Zapisz' : 'Zapłać'}
				</button>
			</div>
		</div>
	)
}
