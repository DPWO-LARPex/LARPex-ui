import { Outlet } from 'react-router-dom'

export default function PaymentRoute() {
	return (
		<>
			<PaymentNavigation />
			<Outlet />
		</>
	)
}

// const routes = [
// 	{ path: '/payments', name: 'Koszyk' },
// 	{ path: '/payments/address', name: 'Adres' },
// 	{ path: '/payments/card', name: 'Płatność' },
// 	{ path: '/payments/summary', name: 'Potwierdzenie' },
// ]

const PaymentNavigation = () => {
	return <nav></nav>
}
