import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

function Root() {
	return (
		<>
			<div className="rootImg " />
			<div className="container mx-auto text-white">
				<Navbar />
				<div className="h-[60rem] w-full flex flex-col bg-stone-950 bg-opacity-50 justify-center items-center gap-5">
					<div className="h-[75%] xl:h-4/5 w-full flex flex-col justify-center items-start px-[10%] pt-20 gap-5">
						<h1 className="text-4xl md:text-7xl text-white tracking-wider">
							Podróż LARP
						</h1>
						<p className="text-2xl md:text-5xl text-white tracking-wider">
							Zaczyna się teraz
						</p>
						<button className="btn bg-red-500 hover:bg-red-700 border-none text-white mt-5 md:mt-10 md:ml-10 md:scale-150">
							Zarezerwuj
						</button>
					</div>
					<div className="flex justify-center item w-full h-[25%] xl:h-1/5 bg-black border-y-white border-y-2">
						<div className="flex flex-col items-center md:w-3/5">
							<div className="divider divider-error text-red-600 font-semibold md:text-xl italic">
								DEKRETEM KRÓLEWSKIM
							</div>
							<p className="w-2/3 text-center md:text-xl">
								Królowa Dworu Królewskiego zaprasza Cię na podróż przez mglę
								czasu na wydarzenie LARP, gdzie brać udział będzie grupa rycerzy
								i ich majestatyczne konie.
							</p>
						</div>
					</div>
				</div>
				<div className="h-full w-full flex flex-col bg-stone-950 bg-opacity-50 justify-center items-center gap-5">
					<div className="flex flex-col md:flex-row h-full w-full bg-stone-900 ">
						<div className="md:w-1/2 flex flex-col justify-center items-center text-center md:text-2xl gap-10 p-20">
							<p>WITAJ W XXXXXXXXXXXXXXX</p>
							<p>
								Najwyżsi rycerze naszego królestwa stawią czoła wyzwaniu,
								walcząc z siłą stalowych mieczy oraz mocą serc, aby wyłonić
								zwycięzcę, który zasługuje na miano obroncy tronu. Dołącz do nas
								podczas uczty pełnej okazałych przyjęć i podniesienia kielicha
								dla naszej Władczyni.
							</p>
							<p>XXXXXXXXXXXXXXXXX</p>
							<p>
								Wspomnienia czekają, by je wcielić w życie, a niezapomniana
								bitwa na wieki oczekuje na Twój przyjazd.
							</p>
							<p className="text-red-500 italic text-xl md:text-3xl pt-10">
								Niech żyje Królowa!
							</p>
						</div>
						<div className="md:w-1/2 md:pl-48 flex items-end bg-black rootMask">
							<img className="bg-stone-900" src="/root/queen.png" />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default Root
