import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import gamesData from './data.json'
import { LuSwords } from 'react-icons/lu'

export default function GameForm() {
	const { id } = useParams()
	const [game, setGame] = useState<null | {
		id: number
		title: string
		author: string
		numberOfPlayers: string
		difficultyLevel: string
		status: string
		imageUrl: string
	}>(null)

	useEffect(() => {
		if (id) {
			const foundGame = gamesData.find(game => game.id === Number(id))
			setGame(foundGame || null)
		}
	}, [id])

	// ...

	return (
		<div>
			<div style={{ backgroundColor: 'grey' }}>
				{game?.imageUrl && <img src={game.imageUrl} alt="Game" />}
			</div>

			<form className="flex flex-col gap-4">
				<label htmlFor="imageUrl">Image URL</label>
				<input
					id="imageUrl"
					type="text"
					value={game?.imageUrl || ''}
					onChange={e => setGame({ ...game!, imageUrl: e.target.value })}
				/>

				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					value={game?.title || ''}
					onChange={e => setGame({ ...game!, title: e.target.value })}
				/>

				<label htmlFor="author">Author</label>
				<input
					type="text"
					id="author"
					value={game?.author || ''}
					onChange={e => setGame({ ...game!, author: e.target.value })}
				/>

				<label htmlFor="players">Max. number of players</label>
				<input
					type="text"
					id="players"
					value={game?.numberOfPlayers || ''}
					onChange={e => setGame({ ...game!, numberOfPlayers: e.target.value })}
				/>

				<label htmlFor="difficultyLevel">Difficulty level</label>
				<div id="difficultyLevel" className="flex items-center">
					{[1, 2, 3, 4, 5].map(level => (
						<LuSwords
							key={level}
							aria-label={`Level ${level}`}
							onClick={() => {
								setGame({ ...game!, difficultyLevel: level.toString() })
							}}
							style={{
								cursor: 'pointer',
								color:
									level <= parseInt(game?.difficultyLevel || '0')
										? 'white'
										: 'grey',
							}}
						/>
					))}
				</div>

				{/* Add more inputs as needed */}

				<p>Status: {game?.status}</p>

				<button type="submit">Submit</button>
			</form>
		</div>
	)
}
