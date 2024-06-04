import { runEventAction } from '@/model/events'
import { EventPostSchema } from '@/model/events/types'
import { PlaceGetSchema } from '@/model/places/types'
import { formatCurrencyAmount } from '@/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

export type EventStatus = {
	id: string
	name: 'not_started' | 'ongoing' | 'paused' | 'ended'
}

export default function EventDetails() {
	const { id = '0' } = useParams()

	const queryClient = useQueryClient()
	const eventQuery = useQuery<EventPostSchema>({
		queryKey: ['api/event', id],
	})
	const placesQuery = useQuery<PlaceGetSchema>({
		queryKey: ['api/place', eventQuery.data?.id_place],
		enabled: Boolean(eventQuery.data),
	})
	const event = eventQuery.data
	const eventStatusQuery = useQuery<EventStatus>({
		queryKey: ['api/event_status', event?.id_status],
		enabled: Boolean(event),
	})

	const eventActionMutation = useMutation({
		mutationFn: runEventAction,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['api/event', id],
			})
		},
	})

	if (!eventQuery.isSuccess) return <div>Loading...</div>

	const eventStatus = getEventStatus(eventStatusQuery.data?.name)

	const numericId = Number(id)

	return (
		<div className="my-12 flex flex-col gap-3 bg-stone-900">
			<div className="flex flex-col gap-8 items-center">
				<img className="w-full h-[200px]" src={event?.icon} alt={event?.icon} />
				<div className="flex gap-2 p-3 bg-slate-800">
					Status: <span>{eventStatus?.children}</span>{' '}
					<div className={`${eventStatus?.color}  w-6 h-6 rounded-full`} />
				</div>
				<div className="flex w-full gap-5 px-12">
					<div className="flex flex-col gap-5 flex-1 bg-slate-800  p-3 ">
						<div className=" flex flex-col gap-3">
							<p>Data i godzina rozpoczęcia</p>
							<p>{event?.date}</p>
						</div>
						<div>
							<p>Cena za udział</p>
							<p>{formatCurrencyAmount(event?.price_buy_in)}</p>
						</div>
						<div>
							<p>Cena organizacji</p>
							<p>{formatCurrencyAmount(event?.price_org)}</p>
						</div>
						<div>
							<p>Placówka</p>
							<p>{formatPlace(placesQuery.data) ?? '-'}</p>
						</div>
					</div>
					<div className="flex flex-col w-3/5 gap-3">
						<div className=" bg-slate-800  p-3 flex-1">
							<p>Opis dla klienta</p>
							<p>{event?.client_description}</p>
						</div>
						<div className=" bg-slate-800  p-3 flex-1">
							<p>Opis techniczny</p>
							<p>{event?.tech_desc}</p>
						</div>
					</div>
				</div>
				<div className="flex w-full gap-5 px-12 pb-12">
					<div className="flex flex-col gap-5 flex-1 bg-slate-800  p-3 ">
						<p>Lista graczy</p>
						...
					</div>
					<div className="flex flex-col w-3/5 gap-5 p-3">
						<div className="flex flex-col gap-3">
							<Link to="./hints">
								<button className="w-full btn bg-red-600 hover:bg-red-800 text-white">
									Prośby o podpowiedzi
								</button>
							</Link>
						</div>
						<div className="flex justify-between space-x-4">
							<button
								className="btn flex-grow bg-red-600 hover:bg-red-800 text-white"
								onClick={() =>
									eventActionMutation.mutate({
										id: numericId,
										action: 'launch',
									})
								}
								disabled={eventStatusQuery.data?.name === 'ongoing'}
							>
								Uruchom
							</button>
							<button
								className="btn flex-grow bg-red-600 hover:bg-red-800 text-white"
								onClick={() =>
									eventActionMutation.mutate({
										id: numericId,
										action: 'pause',
									})
								}
								disabled={
									eventStatusQuery.data?.name === 'paused' ||
									eventStatusQuery.data?.name === 'ended'
								}
							>
								Wstrzymaj
							</button>
							<button
								className="btn flex-grow bg-red-600 hover:bg-red-800 text-white"
								onClick={() =>
									eventActionMutation.mutate({
										id: numericId,
										action: 'end',
									})
								}
								disabled={eventStatusQuery.data?.name === 'ended'}
							>
								Zakończ
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getEventStatus = (status: EventStatus['name'] | undefined) => {
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

const formatPlace = (place: PlaceGetSchema | undefined) => {
	if (!place) return '-'
	return `${place.street} ${place.number}, ${place.city}`
}
