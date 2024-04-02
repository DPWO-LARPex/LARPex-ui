import { client } from '../client'
import { EventGetSchema, EventPostSchema } from './types'

export const sendEvent = async (event: EventPostSchema) => {
	return client<EventGetSchema>('/api/event', {
		method: 'POST',
		body: event,
	})
}
