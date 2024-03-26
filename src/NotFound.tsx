import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

export function NotFound() {
	const error = useRouteError()
	let errorMessage: string

	if (isRouteErrorResponse(error)) {
		// Adjust this line based on the actual structure of ErrorResponse
		errorMessage = error.statusText || 'Unknown error'
	} else if (error instanceof Error) {
		errorMessage = error.message
	} else if (typeof error === 'string') {
		errorMessage = error
	} else {
		errorMessage = 'Unknown error'
	}

	return (
		<div className="h-screen flex flex-col gap-5 justify-center items-center">
			<h1 className="text-4xl">Oops!</h1>
			<h2 className="text-2xl">Sorry, an unexpected error has occurred.</h2>
			<h2 className="text-2xl">{errorMessage}</h2>
			<Link to="/">
				<button className="btn btn-primary">Go back</button>
			</Link>
		</div>
	)
}
