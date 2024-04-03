import { client } from '../client'
import { EventGetSchema, EventPostSchema } from './types'

export const sendEvent = async ({
	event,
	id,
}: {
	event: EventPostSchema
	id?: string
}) => {
	return client<EventGetSchema>(`/api/event${id ? `/${id}` : ''}`, {
		method: id ? 'PUT' : 'POST',
		body: event,
	})
}
