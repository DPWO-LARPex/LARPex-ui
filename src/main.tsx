import React from 'react'
import ReactDOM from 'react-dom/client'

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import { generateUrlFromQueryKey, isKeyWithIgnore } from '@/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { client } from './model/client'
import Root from './routes/root.tsx'
import { PaymentProvider } from './context/PaymentContext.tsx'
import PaymentRoute from './routes/payments/index.tsx'
import CardRoute from './routes/payments/card.tsx'
import SummaryRoute from './routes/payments/summary.tsx'
import { NotFound } from './NotFound.tsx'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import GamesRoute from './routes/games/games.tsx'
import GameForm from './routes/games/gameForm.tsx'
import EventsRoute from './routes/events/index.tsx'
import EventForm from './routes/events/eventForm.tsx'
import PlayerRoute from './routes/player/index.tsx'
import EquipmentRoute from './routes/player/equipment/equipment.tsx'
import PlayerStateRoute from './routes/player/state/state.tsx'

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

const emptyLayout = (
	<div className="container mx-auto h-screen w-screen">
		<Outlet />
	</div>
)

const fullLayout = (
	<div className="container mx-auto h-screen w-screen">
		<Navbar />
		<Outlet />
		<Footer />
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
				element: emptyLayout,
				children: [
					{
						path: '/payments',
						element: <PaymentRoute />,
						children: [
							{ path: '', element: <CardRoute /> },
							{ path: 'summary', element: <SummaryRoute /> },
						],
					},
					//any empty path
				],
			},
			{
				element: fullLayout,
				errorElement: <NotFound />,
				children: [
					{ path: '/avGames', element: <GamesRoute /> },
					{ path: '/avGames/create', element: <GameForm /> },
					{ path: '/avGames/edit/:id', element: <GameForm /> },
					{ path: '/events', element: <EventsRoute /> },
					{ path: '/events/edit', element: <EventForm /> },
					{ path: '/events/edit/:id', element: <EventForm /> },
					{ path: '/player', element: <PlayerRoute /> },
					{ path: '/player/equipment', element: <EquipmentRoute /> },
					{ path: '/player/state', element: <PlayerStateRoute /> },
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<PaymentProvider>
				<RouterProvider router={router} />
			</PaymentProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)
