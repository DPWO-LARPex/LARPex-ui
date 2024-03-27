import gamesData from './data.json'
import { Link } from 'react-router-dom'
import { LuSwords } from 'react-icons/lu'

export default function GamesRoute() {
	return (
		<div className="list my-12">
			<Link to="./create">
				<div className="addGame text-stone-300 flex justify-center items-center h-20 border-2 border-stone-300 bg-stone-900 hover:bg-stone-300 hover:text-stone-900">
					Add new game
				</div>
			</Link>
			{gamesData.map((game, index) => (
				<div key={index} className="game flex my-8">
					<div className="details w-2/5 p-4 bg-stone-900 text-xl">
						<h2 className="text-xl md:text-5xl text-center text-white tracking-wider">
							{game.title}
						</h2>
						<p className="text-center text-base">By {game.author}</p>
						<div className="m-6 space-y-2">
							<p>Max. number of players: {game.numberOfPlayers}</p>
							<div className="flex items-center">
								<p className="mr-2">Difficulty level:</p>
								{[...Array(5)].map((_, i) => (
									<LuSwords
										key={i}
										color={i < Number(game.difficultyLevel) ? 'white' : 'grey'}
										size={30}
									/>
								))}
							</div>
							<div className="flex items-center">
								<p>Status: {game.status}</p>
								<span
									className={`ml-2 inline-block h-3 w-3 rounded-full mr-2 ${game.status === 'Ready' ? 'bg-green-500' : 'bg-orange-500'}`}
								></span>
							</div>
						</div>
					</div>

					<div className="image w-3/5 relative group">
						<img
							className="object-cover object-top h-64 w-full transition duration-500 ease-in-out group-hover:opacity-50"
							src={game.imageUrl}
							alt={game.title}
						/>
						<button className="btn text-stone-200 bg-stone-900 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-900 absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
							<Link to={`./${game.id}`}>More info</Link>
						</button>
						<button className="btn text-stone-200 bg-stone-900 hover:bg-stone-200 hover:border-stone-200 hover:text-stone-900 absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
							<Link to={`./edit/${game.id}`}>Edit</Link>
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
