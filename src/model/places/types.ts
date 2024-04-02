// Place schemas
export interface PlaceGetSchema {
	id: number
	number: number
	street: string
	city: string
}

export interface PlacePostSchema {
	number: number
	street: string
	city: string
}
