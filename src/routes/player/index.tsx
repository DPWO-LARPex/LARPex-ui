/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { sendQuestion } from '@/model/events'

const playerData = {
	name: 'Jan Kowalski',
	nickname: 'DragonSlayer360NoScope',
	rank: 'Ranga',
}

const gameData = {
	title: 'tytuł gry',
	character: {
		name: 'Gerald z Rivii',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel turpis porta, dapibus augue at, ultricies risus. In quis lectus lobortis ante tempus laoreet eget ut odio. Integer in augue ut tellus iaculis iaculis sit amet non risus. Integer tincidunt tellus sapien, id mollis elit iaculis eget. Donec consequat mi lectus, egestas hendrerit nunc lobortis sed. Pellentesque ut orci congue, sollicitudin nulla at, dignissim nibh. Donec ullamcorper tellus ac cursus fringilla. Suspendisse condimentum sit amet risus in porttitor. Quisque ac diam mi. Cras id tristique justo. ',
	},
}

export default function PlayerRoute() {
	const [isHintVisible, setIsHintVisible] = useState(false)
	const [hintText, setHintText] = useState('')
	const [isHintRequestSent, setIsHintRequestSent] = useState(false)

	const userGames = useQuery({
		queryKey: ['api/user', 1, 'games'],
	})

	console.log(userGames)

	const handleHintClick = () => {
		setIsHintVisible(!isHintVisible)

		setIsHintRequestSent(false)
	}

	const questionMutation = useMutation({
		mutationFn: sendQuestion,
	})

	const handleHintChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setHintText(event.target.value)
	}

	const handleSubmitHint = () => {
		console.log('Wysłano odpowiedź: ', hintText)
		setHintText('')
		setIsHintVisible(false)
		setIsHintRequestSent(true)
		questionMutation.mutate({
			event_id: Number(2) ?? 0,
			user_id: 1,
			content: hintText,
		})
	}

	return (
		<div className="mx-32 my-12">
			<div id="player" className="bg-stone-900 flex items-center">
				<div className="w-1/5">
					<img
						className="w-32"
						src="https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg"
						alt=""
					/>
				</div>

				<div className="w-4/5 mx-12">
					<p className="mb-5">{playerData.name}</p>
					<p>{playerData.nickname}</p>
				</div>

				<div className="w-1/5">
					<p>{playerData.rank}</p>
				</div>
			</div>

			<div id="character" className="mt-12 pb-12 bg-stone-900">
				<div className="relative group">
					<img
						className="object-cover object-top h-64 w-full opacity-50"
						src="https://image.jimcdn.com/app/cms/image/transf/dimension=2080x10000:format=jpg/path/s2217cd0bb1220415/image/i968752087e48ef2a/version/1694723212/greatest-medieval-battles.jpg"
						alt={gameData.title}
					/>
					<h1 className="text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
						{gameData.title}
					</h1>
				</div>

				<div className="flex mr-12 mt-12">
					<div className="w-4/5 px-36">
						<h1 className="text-3xl text-stone-200 mb-5">
							{gameData.character.name}
						</h1>
						<div className="text-stone-200">
							{gameData.character.description}
						</div>

						<button
							className={`w-full ${isHintVisible ? 'bg-gray-600 hover:bg-gray-800' : 'bg-red-600 hover:bg-red-800'} text-white btn my-10`}
							onClick={handleHintClick}
						>
							{isHintVisible
								? 'Anuluj prośbę o podpowiedź'
								: 'Poproś o podpowiedź'}
						</button>

						{isHintVisible && (
							<>
								<textarea
									className="w-full h-20 my-4 bg-white text-black"
									value={hintText}
									onChange={handleHintChange}
								></textarea>
								<button
									className="w-full bg-red-600 hover:bg-red-800 text-white btn my-4"
									onClick={handleSubmitHint}
								>
									Wyślij odpowiedź
								</button>
							</>
						)}

						{isHintRequestSent && (
							<p className="text-center text-green-500">
								Prośba została wysłana
							</p>
						)}
					</div>

					<div className="w-1/5">
						<Link to="/map">
							<button className="mb-5 w-32 bg-red-600 hover:bg-red-800 text-white btn mx-4">
								Mapa
							</button>
						</Link>
						<Link to="/player/state">
							<button className="mb-5 w-32 bg-red-600 hover:bg-red-800 text-white btn mx-4">
								Stan gry
							</button>
						</Link>
						<Link to="/player/equipment">
							<button className="mb-5 w-32 bg-red-600 hover:bg-red-800 text-white btn mx-4">
								Ekwipunek
							</button>
						</Link>
						<Link to="/rate">
							<button className="w-32 bg-red-600 hover:bg-red-800 text-white btn mx-4">
								Oceń grę
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
