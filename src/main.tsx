import React from 'react'
import ReactDOM from 'react-dom/client'

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import { generateUrlFromQueryKey, isKeyWithIgnore } from '@/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { client } from './model/client'
import Root from './routes/root.tsx'
import { CartProvider } from './context/CartContext.tsx'
import PaymentRoute from './routes/payments/index.tsx'
import CartRoute from './routes/payments/cart.tsx'
import AddressRoute from './routes/payments/address.tsx'
import CardRoute from './routes/payments/card.tsx'
import SummaryRoute from './routes/payments/summary.tsx'
import { NotFound } from './NotFound.tsx'
import Navbar from './components/Navbar.tsx'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: ({ queryKey }) => {
				const filteredQueryKey = queryKey.filter(
					key => !isKeyWithIgnore(key) || !key.ignore,
				)
				const url = generateUrlFromQueryKey(filteredQueryKey)
				return client(url)
			},
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
})

const defaultLayout = (
	<div className="container mx-auto h-screen w-screen">
		<Outlet />
	</div>
)

const navbarLayout = (
	<div className="container mx-auto h-screen w-screen">
		<Navbar />
		<Outlet />
	</div>
)

const router = createBrowserRouter([
	{
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <Root />,
			},
			{
				element: defaultLayout,
				children: [
					{
						path: '/payments',
						element: <PaymentRoute />,
						children: [
							{ path: '', element: <CartRoute /> },
							{ path: 'address', element: <AddressRoute /> },
							{ path: 'card', element: <CardRoute /> },
							{ path: 'summary', element: <SummaryRoute /> },
						],
					},
					//any empty path
				],
			},
			{
				element: navbarLayout,
				errorElement: <NotFound />,
				children: [
					//any path that needs a navbar
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CartProvider>
				<RouterProvider router={router} />
			</CartProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)
