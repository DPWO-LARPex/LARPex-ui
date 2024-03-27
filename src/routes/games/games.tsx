export default function GamesRoute() {
	return (
		<div className="list">
			<div className="flex my-4">
				<div className="details w-1/4 p-4">
					<h2>title</h2>
					<p>author</p>
					<p>number of players</p>
					<p>difficulty level</p>
					<p>status</p>
				</div>
				<div className="image w-3/4">
					<img
						className="object-cover object-top h-64 w-full"
						src="https://image.jimcdn.com/app/cms/image/transf/dimension=2080x10000:format=jpg/path/s2217cd0bb1220415/image/i968752087e48ef2a/version/1694723212/greatest-medieval-battles.jpg"
						alt=""
					/>
				</div>
			</div>
		</div>
	)
}
