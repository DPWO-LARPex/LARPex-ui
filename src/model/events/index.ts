import { client } from '../client'
import { EventPostSchema } from './types'

export const sendEvent = async (event: EventPostSchema) => {
	return client('/api/event', {
		method: 'POST',
		body: event,
	})
}
