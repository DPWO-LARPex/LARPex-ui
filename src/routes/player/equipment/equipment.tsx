/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom'

const playerData = {
	name: 'Jan Kowalski',
	nickname: 'DragonSlayer360NoScope',
	rank: 'Ranga',
}

export default function EquipmentRoute() {
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

			<div className="flex flex-col justify-center items-center mt-12 p-12 bg-stone-900">
				<h1 className="text-white text-3xl justify-center items-center">
					Stan ekwipunku
				</h1>

				<div className="flex flex-col space-y-10 mt-12 bg-zinc-800 w-full p-10 text-xl">
					<h2>Liczba przedmiotów</h2>
					<div>5</div>
					<h2>Posiadane przedmioty</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10">
						{[...Array(8)].map((_, index) => (
							<div
								key={index}
								className="bg-zinc-700 w-40 h-24 flex justify-center items-center mx-auto"
							>
								Przedmiot {index + 1}
							</div>
						))}
					</div>
				</div>
				<Link to="/player" className="flex items-center justify-center pt-8">
					<button className=" bg-red-600 hover:bg-red-800 text-white btn mx-4 text-xl">
						Powrót do panelu gracza
					</button>
				</Link>
			</div>
		</div>
	)
}
