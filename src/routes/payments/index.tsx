import { Outlet, useLocation } from 'react-router-dom'

export default function PaymentRoute() {
	return (
		<article className="w-full h-full flex flex-col items-center">
			<PaymentNavigation />
			<div className="w-full p-3">
				<Outlet />
			</div>
		</article>
	)
}

const routes = [
	{ path: '/payments', name: 'Koszyk' },
	{ path: '/payments/address', name: 'Adres' },
	{ path: '/payments/card', name: 'Płatność' },
	{ path: '/payments/summary', name: 'Potwierdzenie' },
]

const PaymentNavigation = () => {
	const location = useLocation()
	const currentActiveRoute = routes.findIndex(
		({ path }) => location.pathname === path,
	)

	return (
		<nav>
			<ul className="steps">
				{routes.map(({ name }, index) => {
					const isActive = index <= currentActiveRoute
					return (
						<li
							data-content={isActive ? '✓' : ''}
							className={`step ${isActive ? 'step-primary' : ''}`}
						>
							{name}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
