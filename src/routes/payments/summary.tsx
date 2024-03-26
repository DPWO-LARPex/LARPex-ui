import { useCart } from '@/context/CartContext'
import { Link } from 'react-router-dom'

export default function SummaryRoute() {
	const {
		state: { isSuccess },
	} = useCart()
	return (
		<div className="w-100 p-5">
			<h2 className="text-3xl pb-3">Address</h2>
			{isSuccess ? <Success /> : <Error />}
		</div>
	)
}

const Success = () => {
	return (
		<div className="flex justify-center w-full flex-col items-center gap-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="stroke-current shrink-0 h-6 w-6 min-w-32 min-h-32"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>
				Payment successful.{' '}
				<Link className="underline" to="/">
					Click to return to Main Page
				</Link>
			</span>
			<Link className="btn btn-primary" to="/">
				Finish
			</Link>
		</div>
	)
}

const Error = () => {
	return (
		<div className="flex justify-center w-full flex-col items-center gap-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="stroke-current shrink-0 h-6 w-6 min-w-32 min-h-32"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>

			<span>Payment unsuccessful.</span>
			<Link className="btn btn-primary" to="/payments/card">
				Try again
			</Link>
		</div>
	)
}
