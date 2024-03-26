import { useQuery } from '@tanstack/react-query'

function Root() {
	useQuery({ queryKey: ['example'] })
	return <></>
}

export default Root
