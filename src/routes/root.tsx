import { useQuery } from '@tanstack/react-query'

function Root() {
	useQuery({ queryKey: ['example'] })
	return (
		<>
			<button className="btn btn-primary">test</button>
		</>
	)
}

export default Root
