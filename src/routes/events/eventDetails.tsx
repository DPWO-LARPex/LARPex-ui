import { EventPostSchema } from '@/model/events/types'
import { PlaceGetSchema } from '@/model/places/types'
import { formatCurrencyAmount } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export default function EventDetails() {
	const { id } = useParams()

	const eventQuery = useQuery<EventPostSchema>({
		queryKey: ['api/event', id],
	})
	const placesQuery = useQuery<PlaceGetSchema>({
		queryKey: ['api/place', eventQuery.data?.id_place],
		enabled: Boolean(eventQuery.data),
	})

	const event = eventQuery.data

	if (!eventQuery.isSuccess) return <div>Loading...</div>

	const eventStatus = getEventStatus(event?.id_status)

	return (
		<div className="my-12 px-28 py-12 flex flex-col gap-3">
			<div className="flex flex-col gap-8 items-center">
				<img className="w-full h-[200px]" src={event?.icon} alt={event?.icon} />
				<div className="flex gap-2 p-3 bg-slate-800">
					Status: <span>{eventStatus?.children}</span>{' '}
					<div className={`${eventStatus?.color}  w-6 h-6 rounded-full`} />
				</div>
				<div className="flex w-full gap-5">
					<div className="flex flex-col gap-5 flex-1">
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
				<div className="flex w-full gap-5">
					<div className="flex flex-col gap-5 flex-1">
						<p>Lista graczy</p>
						...
					</div>
					<div className="flex flex-col w-3/5 gap-3">
						<button className="btn">Poproś o podpowiedź</button>
						<div className="flex justify-between">
							<button className="btn">Uruchom</button>
							<button className="btn">Wstrzymaj</button>
							<button className="btn">Zakończ</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const getEventStatus = (status: number | undefined) => {
	switch (status) {
		case 1:
			return { children: 'W trakcie', color: 'bg-green-500' }
		case 2:
			return { children: 'Wstrzymany', color: 'bg-orange-500' }
		case 3:
			return { children: 'Zakończony', color: 'bg-red-500' }
		case 4:
		default:
			return { children: 'Nie uruchomiony', color: 'bg-gray-500' }
	}
}

const formatPlace = (place: PlaceGetSchema | undefined) => {
	if (!place) return '-'
	return `${place.street} ${place.number}, ${place.city}`
}
