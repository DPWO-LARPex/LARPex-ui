import { client } from '../client'
import { GameGetSchema, GamePostSchema } from './types'

export const sendGame = async ({
	game,
	id,
}: {
	game: GamePostSchema
	id?: string
}) => {
	return client<GameGetSchema>(`/api/game${id ? `/${id}` : ''}`, {
		method: id ? 'PUT' : 'POST',
		body: game,
	})
}
