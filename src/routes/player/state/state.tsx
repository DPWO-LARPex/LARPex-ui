/* eslint-disable prettier/prettier */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import { Link } from 'react-router-dom'

const playerData = {
	name: 'Jan Kowalski',
	nickname: 'DragonSlayer360NoScope',
	rank: 'Ranga',
}

export default function PlayerStateRoute() {
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

			<div className="flex flex-col gap-12 justify-center items-center mt-12 p-12 bg-stone-900">
				<h1 className="text-white text-3xl justify-center items-center">
					Stan gry
				</h1>

				<div className="flex gap-10 space-between w-full">
					<div className="flex flex-col w-full justify-start items-start gap-4 bg-zinc-800 p-10 text-xl">
						<h1 className="text-2xl mx-auto">Stan rozgrywki</h1>
						<h2>
							<FontAwesomeIcon icon={faClock} /> Czas rozgrywki:
						</h2>
						<div className="pl-8">2h 30min</div>
						<h2>
							<FontAwesomeIcon icon={faBullseye} /> Zdobyte punkty:
						</h2>
						<div className="pl-8">350pkt</div>
						<h2>
							<FontAwesomeIcon icon={faUser} /> Położenie graczy:
						</h2>
						<div className="pl-8">1. Jan Nowak - Położenie 1</div>
						<div className="pl-8">2. Ewa Szczygieł - Położenie 2</div>
						<div className="pl-8">3. Grzegorz Bąk - Położenie 3</div>
						<div className="pl-8">4. Marek Mostowiak - Położenie 4</div>
					</div>
					<div className="flex flex-col w-full justify-start items-start gap-4 bg-zinc-800 p-10 text-xl">
						<h1 className="text-2xl mx-auto">Kamienie milowe</h1>
						<h2>Osiągnięte:</h2>
						<div className="pl-8">
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-green-500 mr-[-0.3rem] opacity-50"
							/>
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-green-500 opacity-50"
							/>{' '}
							Kamień milowy 1
						</div>
						<div className="pl-8">
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-green-500 mr-[-0.3rem] opacity-50"
							/>
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-green-500 opacity-50"
							/>{' '}
							Kamień milowy 2
						</div>
						<div className="pl-8">
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-green-500 mr-[-0.3rem] opacity-50"
							/>
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-green-500 opacity-50"
							/>{' '}
							Kamień milowy 3
						</div>
						<div className="pl-8">
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-green-500 mr-[-0.3rem] opacity-50"
							/>
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-green-500 opacity-50"
							/>{' '}
							Kamień milowy 4
						</div>
						<h2> Do zdobycia:</h2>
						<div className="relative">
							<div className="pl-8">
								<FontAwesomeIcon
									icon={faChevronDown}
									className="text-red-500 opacity-50"
								/>{' '}
								Kamień milowy 5
								<div className="absolute top-[0.5rem]">
									<FontAwesomeIcon
										icon={faChevronDown}
										className="text-red-500 opacity-50"
									/>
								</div>
								<ul className="list-disc pl-5 ml-8">
									<li className="pl-2">Warunek 1</li>
									<li className="pl-2">Warunek 2</li>
								</ul>
							</div>
						</div>
						<div className="pl-8">
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-red-500 mr-[-0.3rem] opacity-50"
							/>
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-red-500 opacity-50"
							/>{' '}
							Kamień milowy 6
						</div>
						<div className="pl-8">
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-red-500 mr-[-0.3rem] opacity-50"
							/>
							<FontAwesomeIcon
								icon={faChevronRight}
								className="text-red-500 opacity-50"
							/>{' '}
							Kamień milowy 7
						</div>
					</div>
				</div>
				<Link to="/player" className="flex items-center justify-center">
					<button className=" bg-red-600 hover:bg-red-800 text-white btn mx-4 text-xl">
						Powrót do panelu gracza
					</button>
				</Link>
			</div>
		</div>
	)
}
