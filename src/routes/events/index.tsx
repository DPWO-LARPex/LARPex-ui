import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

interface Event {
	id: number
	icon: string
	tech_desc: string
	client_description: string
	players_count: number
	date: Date
	price_org: number
	price_buy_in: number
	id_status: number
	id_user: number
	id_place: number
}

export default function EventsRoute() {
	const {
		data: events,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['events'],
		queryFn: async () => {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/event`)
			const data = await response.json()
			console.log(data)
			return data
		},
	})

	if (isError) throw new Error('Couldnt load events')
	if (isLoading)
		return <div className="flex justify-center p-80">Loading...</div>
	return (
		<div className="list my-12">
			<Link to="./edit">
				<div className="addGame text-stone-300 flex justify-center items-center h-20 border-2 border-stone-300 bg-stone-900 hover:bg-stone-300 hover:text-stone-900">
					Dodaj nowe wydarzenie
				</div>
			</Link>
			{events.map((event: Event, index: number) => (
				<div key={index} className="game flex my-8">
					<div className="details w-2/5 p-4 bg-stone-900 text-xl">
						<h2 className="text-xl md:text-5xl text-center text-white tracking-wider">
							{/* {event.title} */}
							EVENT
						</h2>
						<p className="text-center text-base">
							By {event.client_description}
						</p>
						<div className="m-6 space-y-2">
							<p>Max. number of players: {event.players_count}</p>
							<div className="flex items-center">
								<p className="mr-2">Difficulty level:</p>
								{/* {[...Array(5)].map((_, i) => (
									<LuSwords
										key={i}
										color={i < Number(event.date) ? 'white' : 'grey'}
										size={30}
									/>
								))} */}
							</div>
							<div className="flex items-center">
								<p>Status: {event.price_buy_in}</p>
								{/* <span
									className={`ml-2 inline-block h-3 w-3 rounded-full mr-2 ${event.status === 'Ready' ? 'bg-green-500' : 'bg-orange-500'}`}
								></span> */}
							</div>
						</div>
					</div>

					<div className="image w-3/5 relative group">
						<img
							className="object-cover object-top h-64 w-full transition duration-500 ease-in-out group-hover:opacity-50"
							src={event.icon}
							alt={event.icon}
						/>
						<button className="btn text-stone-200 bg-stone-900 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-900 absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
							<Link to={`./edit/${event.id}`}>More info</Link>
						</button>
						<button className="btn text-stone-200 bg-stone-900 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-900 absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
							<Link to={`./edit/${event.id}`}>Edit</Link>
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
