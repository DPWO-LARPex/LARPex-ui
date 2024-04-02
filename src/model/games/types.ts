import { MapGetSchema } from '../maps/types'

// Game schemas
export interface GameGetSchema {
	game_id: number
	user_id: number
	name: string
	description: string
	max_players_number: number
	state: string
	difficulty: string
	scenario: string
	maps: MapGetSchema[]
}

export interface GamePostSchema {
	user_id: number
	name: string
	description: string
	max_players_number: number
	state: string
	difficulty: string
	scenario: string
}
