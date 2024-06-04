import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { EventGetSchema } from '@/model/events/types'
import { formatCurrencyAmount } from '@/utils'
import dayjs from 'dayjs'
import { client } from '@/model/client'
export default function EventsRoute() {
	const userId = 1

	const {
		data: events,
		isLoading,
		isError,
	} = useQuery<EventGetSchema[]>({
		queryKey: ['api/event'],
	})

	if (isError) throw new Error('Couldnt load events')
	if (isLoading)
		return <div className="flex justify-center p-80">Loading...</div>

	const joinEvent = async ({
		eventId
	}: {
		eventId?: number
	}) => {
		return client<{ player_id: number }>(`/api/event/${eventId}/join_event`, {
			method: 'POST',
			body: { player_id: userId },
		})
	}

	return (
		<div className="list my-12">
			<Link to="./edit">
				<div className="addGame text-stone-300 flex justify-center items-center h-20 border-2 border-stone-300 bg-stone-900 hover:bg-stone-300 hover:text-stone-900">
					Dodaj nowe wydarzenie
				</div>
			</Link>
			{events?.map((event, index) => (
				<div key={index} className="game flex my-8">
					<div className="details w-2/5 p-4 bg-stone-900 text-xl">
						<h2 className="text-xl md:text-5xl text-center text-white tracking-wider">
							{/* {event.title} */}
							Wydarzenie
						</h2>
						<p className="text-center text-base">{event.client_description}</p>
						<div className="m-6 space-y-2">
							<p>Ilość graczy: {event.players_count}</p>
							<div className="flex items-center">
								<p className="mr-2">
									Cena: {formatCurrencyAmount(event.price_buy_in)}
								</p>
								{/* {[...Array(5)].map((_, i) => (
									<LuSwords
										key={i}
										color={i < Number(event.date) ? 'white' : 'grey'}
										size={30}
									/>
								))} */}
							</div>
							<div className="flex items-center">
								<p>Data wydarzenia: {dayjs(event.date).format('DD.MM.YYYY')}</p>
								{/* <span
									className={`ml-2 inline-block h-3 w-3 rounded-full mr-2 ${event.status === 'Ready' ? 'bg-green-500' : 'bg-orange-500'}`}
								></span> */}
							</div>
						</div>
					</div>

					<div className="image w-3/5 relative group bg-cover bg-center h-64" style={{ backgroundImage: `url(${event.icon ?? ''})` }}>
						<div className="flex gap-4 justify-center items-center h-full">
							<Link
								className="btn text-stone-200 bg-stone-900 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-900 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"
								to={`./${event.id}`}
							>
								Wyświetl
							</Link>
							<Link
								className="btn text-stone-200 bg-stone-900 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-900 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"
								to={`./edit/${event.id}`}
							>
								Edytuj
							</Link>
							<Link
								className="btn text-stone-200 bg-stone-900 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-900 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"
								to={`./register/${event.id}`}
							>
								Zapisz się
							</Link>
							<button
								className="btn text-stone-200 bg-stone-900 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-900 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out"
								onClick={() => {joinEvent({ eventId: event.id }); console.log('Joining event', event.id)}}
							>
								Dołącz
							</button>
						</div>
					</div>

				</div>
			))}
		</div>
	)
}
