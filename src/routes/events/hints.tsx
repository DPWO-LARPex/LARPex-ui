// const hintsData = [
// 	{
// 		request: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus neque, interdum nec risus sed, efficitur luctus odio. Etiam sit amet viverra erat. Duis nulla orci, mattis at volutpat sagittis, ultricies in erat. Ut aliquet gravida neque, a congue enim rutrum eu."
// 	},
// 	{
// 		request: "Lorem ipsum Lorem ipsum "
// 	}
// ]

// prettier-ignore
const hintsData = []

export default function HintsRoute() {
	return (
		<div className="bg-stone-900 mx-24 my-12 py-8 px-24">
			<div className="bg-stone-700 text-center w-36 mx-auto mb-8 p-2">
				<h2 className="text-white">Lista próśb</h2>
			</div>

			{hintsData.length > 0 ? (
				hintsData.map(hint => (
					<div className="bg-white flex justify-between p-4 rounded mb-4">
						<div className="pr-2 text-black">{hint.request}</div>
						<button className="bg-red-600 hover:bg-red-800 text-white btn my-4 border-none">
							Odpowiedz
						</button>
					</div>
				))
			) : (
				<p className="text-white text-center text-2xl">
					Brak dostępnych próśb o podpowiedź.
				</p>
			)}
		</div>
	)
}
