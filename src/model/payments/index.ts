import { State } from '@/context/CartContext'
import { client } from '../client'

export const buyGame = async (body: Omit<State, 'isSuccess'>) => {
	return client('/api/payments', {
		method: 'POST',
		body,
	})
}
