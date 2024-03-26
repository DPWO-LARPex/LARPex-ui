import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import { generateUrlFromQueryKey, isKeyWithIgnore } from '@/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { client } from './model/client'
import Root from './routes/root.tsx'

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

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
)
