import Navbar from '@/components/Navbar'

function Root() {
	return (
		<div className="rootImg">
			<div className="container mx-auto h-screen w-screen">
				<Navbar />
				<div className="h-full w-full flex flex-col bg-stone-950 bg-opacity-50 justify-center items-center gap-5">
					<div className="h-[75%] xl:h-4/5 w-full flex flex-col justify-center items-start px-[10%] pt-20 gap-5">
						<h1 className="text-4xl md:text-7xl text-white tracking-wider">
							LARP Journey
						</h1>
						<p className="text-2xl md:text-5xl text-white tracking-wider">
							Begins now
						</p>
						<button className="btn bg-red-600 hover:bg-red-900 border-none text-white mt-5 md:mt-10 md:ml-10 md:scale-150">
							Book the game
						</button>
					</div>
					<div className="flex justify-center w-full h-[25%] xl:h-1/5 bg-stone-950 border-t-white border-t-2">
						<div className="flex flex-col items-center md:w-3/5">
							<div className="divider divider-error text-red-600 font-semibold">
								BY ROYAL DECREE
							</div>
							<p className="w-2/3 text-center">
								The Queen of the Royal Court invites you to travel through the
								mists of time to a LARP event where xxx knights/majestic horses.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Root
