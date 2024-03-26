import { useCart } from '@/context/CartContext'
import { formatCurrencyAmount } from '@/utils'
import { Link } from 'react-router-dom'

export default function CartRoute() {
	const {
		state: { cart },
		dispatch,
	} = useCart()

	const sumOfCart = cart.reduce((acc, { price }) => acc + price, 0)

	const removeItem = (id: string) => {
		dispatch({ type: 'removeFromCart', payload: id })
	}

	const clearAllCart = () => {
		dispatch({ type: 'clearCart' })
	}

	return (
		<article className="w-full flex flex-col">
			<section className="flex flex-col items-start gap-3">
				<h1 className="text-2xl">Koszyk</h1>
				{cart.map(({ id, name, price }) => (
					<div className="card card-side bg-base-100 shadow-xl" key={id}>
						<figure>
							<img
								src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
								alt="Movie"
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title">{name}</h2>
							<p>{formatCurrencyAmount(price)}</p>
							<button className=" btn btn-error" onClick={() => removeItem(id)}>
								X
							</button>
						</div>
					</div>
				))}
				<div className="stats shadow">
					<div className="stat">
						<div className="stat-title">Total price</div>
						<div className="stat-value">{formatCurrencyAmount(sumOfCart)}</div>
					</div>
				</div>
				<button className="btn btn-error" onClick={clearAllCart}>
					Clear cart
				</button>
			</section>
			<Link className="btn btn-primary self-end" to="address">
				Dalej
			</Link>
		</article>
	)
}
