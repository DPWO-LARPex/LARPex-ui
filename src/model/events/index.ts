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

export const sendQuestion = async (body: {
	event_id: number
	user_id: number
	content: string
}) => {
	return client(`/api/event/question`, {
		method: 'POST',
		body: body,
	})
}

type Action = 'launch' | 'pause' | 'end'

export const runEventAction = ({
	id,
	action,
}: {
	id: number
	action: Action
}) => {
	return client(`/api/event/${id}/${action}`, {
		method: 'POST',
	})
}

export const sendEventStatusLaunch = async ({
	id,
}: {
	id?: string
}) => {
	return client(`/api/event/${id}/launch`, {
		method: 'POST',
	})
}

export const sendEventStatusEnd = async ({
	id,
}: {
	id?: string
}) => {
	return client(`/api/event/${id}/end`, {
		method: 'POST',
	})
}

