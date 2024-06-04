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

export type EventFormSign = {
	firstname: string
	lastname: string
	email: string
	character_id: number
	payment_id: number
}

export const signUp = ({ id, event }: { id: string; event: EventFormSign }) => {
	return client(`/api/event/${id}/sign_up`, {
		method: 'POST',
		body: event,
	})
}
