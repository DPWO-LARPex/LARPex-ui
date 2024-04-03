import { MapGetSchema } from '../maps/types'

// Game schemas
export type GameGetSchema = {
	game_id: number
	user_id: number
	name: string
	description: string
	max_players_number: number
	min_players_number: number
	state: string
	difficulty: number
	scenario: string
	maps: MapGetSchema[]
}

export type GamePostSchema = {
	user_id: number
	name: string
	description: string
	max_players_number: number
	state: string
	difficulty: string
	scenario: string
}
