import { formatCurrencyAmount } from '@/utils'
import { Link } from 'react-router-dom'

export default function CartRoute() {
	return (
		<article className="w-full flex flex-col">
			<section className="flex flex-col items-start gap-3">
				<h1 className="text-2xl">Koszyk</h1>
				<div className="card card-side bg-base-100 shadow-xl">
					<figure>
						<img
							src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
							alt="Movie"
						/>
					</figure>
					<div className="card-body">
						<h2 className="card-title">New movie is released!</h2>
						<p>Click the button to watch on Jetflix app.</p>
					</div>
				</div>
				<div className="stats shadow">
					<div className="stat">
						<div className="stat-title">Total price</div>
						<div className="stat-value">{formatCurrencyAmount(9123)}</div>
					</div>
				</div>
			</section>
			<Link className="btn btn-primary self-end" to="address">
				Dalej
			</Link>
		</article>
	)
}
