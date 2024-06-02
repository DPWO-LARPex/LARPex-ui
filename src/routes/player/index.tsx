/* eslint-disable prettier/prettier */
import { Link } from "react-router-dom"

const playerData = {
	name: "Jan Kowalski",
	nickname: "DragonSlayer360NoScope",
	rank: "Ranga"
}

const gameData = {
	title: "tytuł gry",
	character: {
		name: "Gerald z Rivii",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel turpis porta, dapibus augue at, ultricies risus. In quis lectus lobortis ante tempus laoreet eget ut odio. Integer in augue ut tellus iaculis iaculis sit amet non risus. Integer tincidunt tellus sapien, id mollis elit iaculis eget. Donec consequat mi lectus, egestas hendrerit nunc lobortis sed. Pellentesque ut orci congue, sollicitudin nulla at, dignissim nibh. Donec ullamcorper tellus ac cursus fringilla. Suspendisse condimentum sit amet risus in porttitor. Quisque ac diam mi. Cras id tristique justo. "
	}
}

export default function PlayerRoute() {
	return (
		<div className="mx-32 my-12">
			<div id="player" className="bg-stone-900 flex items-center">
				<div className="w-1/5">
					<img className="w-32" src="https://kis.agh.edu.pl/wp-content/uploads/2021/01/default-avatar.jpg" alt="" />
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
					<h1 className="text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">{gameData.title}</h1>
				</div>
				
				<div className="flex mr-12 mt-12">
					<div className="w-4/5 px-36">
						<h1 className="text-3xl text-stone-200 mb-5">{gameData.character.name}</h1>
						<div className="text-stone-200">
							{gameData.character.description}
						</div>
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