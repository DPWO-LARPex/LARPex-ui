import gamesData from './data.json'
import { Link } from 'react-router-dom'
import { LuSwords } from 'react-icons/lu'

export default function GamesRoute() {
	return (
		<div className="list my-12">
			<Link to="./create">
				<div className="addGame flex justify-center items-center h-20 border-2 border-gray-300 bg-black hover:bg-gray-700">
					Add new game
				</div>
			</Link>
			{gamesData.map((game, index) => (
				<div key={index} className="game flex my-4">
					<div className="details w-1/4 p-4 bg-black">
						<h2>{game.title}</h2>
						<p>Author: {game.author}</p>
						<p>Max. number of players: {game.numberOfPlayers}</p>
						<div className="flex items-center">
							<p>Difficulty level:</p>
							{[...Array(5)].map((_, i) => (
								<LuSwords
									key={i}
									color={i < Number(game.difficultyLevel) ? 'white' : 'grey'}
									size={20}
								/>
							))}
						</div>

						<p>Status: {game.status}</p>
					</div>
					<div className="image w-3/4 relative group">
						<img
							className="object-cover object-top h-64 w-full transition duration-500 ease-in-out group-hover:opacity-50"
							src={game.imageUrl}
							alt={game.title}
						/>
						<button className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
							<Link to={`./${game.id}`}>More info</Link>
						</button>
						<button className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">
							<Link to={`./edit/${game.id}`}>Edit</Link>
						</button>
					</div>
				</div>
			))}
		</div>
	)
}
