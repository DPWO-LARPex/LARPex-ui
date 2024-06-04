import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { LuSwords } from 'react-icons/lu'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GameGetSchema, GamePostSchema } from '@/model/games/types'
import { sendGame } from '@/model/games'

export default function GameForm() {
	const { id } = useParams()
	const isEditMode = Boolean(id)
	const gamesQuery = useQuery<GameGetSchema>({
		queryKey: ['api/game', id],
		enabled: isEditMode,
	})

	const [formData, setFormData] = useState<GamePostSchema>({
		name: '',
		description: '',
		state: '',
		difficulty: '',
		scenario: '',
		max_players_number: 0,
		user_id: 1,
	})

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault() // Prevent the default form submit behavior to log the form data
		const updatedGame = { ...formData, status: 'Proposition' }
		console.log('form sent', updatedGame)
		mutation.mutate({ game: { ...updatedGame, user_id: 1 }, id })
	}

	useEffect(() => {
		if (gamesQuery.data) {
			setFormData(gamesQuery.data)
		}
	}, [gamesQuery.data])

	const queryClient = useQueryClient()
	const navigator = useNavigate()
	const mutation = useMutation({
		mutationFn: sendGame,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['api/game'] })
			navigator('/avGames')
		},
	})

	return (
		<div className="my-12 px-28 py-12">
			{/* <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
				{formData?.imageUrl ? (
					<img
						src={formData.imageUrl}
						alt="Game"
						className="object-cover h-full w-full"
					/>
				) : (
					<p className="text-center text-gray-500">
						Wprowadź adres URL w polu wejściowym, aby wyświetlić odpowiadający
						obraz.
					</p>
				)}
			</div> */}

			<form
				className="flex flex-col gap-4 bg-stone-900 py-12 px-40"
				onSubmit={handleSubmit}
			>
				{/* <div className="form-control">
					<label className="label">
						<span className="label-text">Adres URL obrazu</span>
					</label>
					<input
						value={formData?.imageUrl || ''}
						onChange={e =>
							setFormData({ ...formData!, imageUrl: e.target.value })
						}
						className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
					/>
				</div> */}

				<div className="flex justify-between">
					<div className="w-full">
						<label className="label">
							<span className="label-text">Tytuł</span>
						</label>
						<input
							value={formData?.name || ''}
							onChange={e =>
								setFormData({ ...formData!, name: e.target.value })
							}
							className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
						/>
					</div>

					{/* <div className="w-1/2 pl-12">
						<label className="label">
							<span className="label-text">Autor</span>
						</label>
						<input
							value={formData?.author || ''}
							onChange={e =>
								setFormData({ ...formData!, author: e.target.value })
							}
							className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
						/>
					</div> */}
				</div>

				<div className="flex justify-between">
					{/* <div className="w-1/2 pr-12">
						<label className="label">
							<span className="label-text">Minimalna liczba graczy</span>
						</label>
						<input
							value={formData?.max_players_number || ''}
							onChange={e =>
								setFormData({
									...formData!,
									max_players_number: e.target.value,
								})
							}
							className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
						/>
					</div> */}

					<div className="w-full">
						<label className="label">
							<span className="label-text">Maksymalna liczba graczy</span>
						</label>
						<input
							value={formData?.max_players_number || ''}
							onChange={e =>
								setFormData({
									...formData!,
									max_players_number: Number(e.target.value),
								})
							}
							className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
						/>
					</div>
				</div>

				<div className="mx-auto text-center">
					<label className="label">
						<span className="label-text">Poziom trudności</span>
					</label>
					<div id="difficultyLevel" className="flex items-center">
						{[1, 2, 3, 4, 5].map(level => (
							<LuSwords
								key={level}
								aria-label={`Level ${level}`}
								onClick={() => {
									setFormData({ ...formData!, difficulty: level.toString() })
								}}
								className={`cursor-pointer hover:text-stone-200 ${level <= parseInt(formData?.difficulty || '0') ? 'text-white' : 'text-gray-500'}`}
								size={40}
							/>
						))}
					</div>
				</div>

				<div>
					<label className="label">
						<span className="label-text">Opis</span>
					</label>
					<textarea
						value={formData?.description || ''}
						onChange={e =>
							setFormData({ ...formData!, description: e.target.value })
						}
						className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
					/>
				</div>

				<div>
					<label className="label">
						<span className="label-text">Scenariusz</span>
					</label>
					<textarea
						value={formData?.scenario || ''}
						onChange={e =>
							setFormData({ ...formData!, scenario: e.target.value })
						}
						className="input w-full bg-white text-black input-bordered focus:outline-offset-0"
					/>
				</div>

				{/* {formData?.status && formData.status.trim() !== '' && (
					<div className="flex items-center">
						<p>Status: {formData.status}</p>
						<span
							className={`ml-2 inline-block h-3 w-3 rounded-full mr-2 ${formData.status === 'Ready' ? 'bg-green-500' : 'bg-orange-500'}`}
						></span>
					</div>
				)} */}

				<div className="flex justify-center">
					<Link to="/avGames" className="mx-4">
						<button className="btn bg-white text-black hover:bg-gray-500">
							Anuluj
						</button>
					</Link>
					<button
						type="submit"
						className="bg-red-600 hover:bg-red-800 text-white btn mx-4"
					>
						Zapisz
					</button>
				</div>
			</form>
		</div>
	)
}
