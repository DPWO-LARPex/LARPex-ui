/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
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
		description: string
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
		<div className="my-12">
			<div style={{ backgroundColor: 'grey' }}>
				{game?.imageUrl && <img src={game.imageUrl} alt="Game" />}
			</div>

			<form className="flex flex-col gap-4 bg-stone-900 py-12 px-40">
				<div className="form-control">
					<label className="label">
						<span className="label-text">Image URL</span>
					</label>
					<input
						value={game?.imageUrl || ''}
						onChange={e => setGame({ ...game!, imageUrl: e.target.value })}
						className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
					/>
				</div>

				<div className="flex justify-between">
					<div className="w-1/2 pr-12">
						<label className="label">
							<span className="label-text">Game Title</span>
						</label>
						<input
							value={game?.title || ''}
							onChange={e => setGame({ ...game!, title: e.target.value })}
							className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
						/>
					</div>

					<div className="w-1/2 pl-12">
						<label className="label">
							<span className="label-text">Author</span>
						</label>
						<input
							value={game?.author || ''}
							onChange={e => setGame({ ...game!, author: e.target.value })}
							className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
						/>
					</div>
				</div>

				<div className="flex justify-between">
					<div className="w-1/2 pr-12">
						<label className="label">
							<span className="label-text">Max. number of players</span>
						</label>
						<input
							value={game?.numberOfPlayers || ''}
							onChange={e =>
								setGame({ ...game!, numberOfPlayers: e.target.value })
							}
							className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
						/>
					</div>

					<div className="w-1/2 pl-12">
						<label className="label">
							<span className="label-text">Difficulty level</span>
						</label>
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
									size={40}
								/>
							))}
						</div>
					</div>
				</div>

				<div>
					<label className="label">
						<span className="label-text">Description</span>
					</label>
					<textarea
						value={game?.description || ''}
						onChange={e => setGame({ ...game!, description: e.target.value })}
						className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
					/>
				</div>

				{game?.status && <p>Status: {game.status}</p>}

				<div className="flex justify-center">
					<Link to="/avgames" className="mx-4">
						<button className="btn">Cancel</button>
					</Link>
					<button type="submit" className="btn mx-4">
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}
