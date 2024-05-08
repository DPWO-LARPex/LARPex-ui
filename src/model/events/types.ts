// Event schemas
export type EventGetSchema = {
	id: number
	icon: string | null
	tech_desc: string
	client_description: string
	players_count: number
	date: string // Should be properly typed as Date if possible
	price_org: number
	price_buy_in: number
	id_status: number
	id_user: number
	id_place: number
}

export type EventPostSchema = {
	icon: string
	tech_desc: string
	client_description: string
	players_count: number
	date: string // Should be properly typed as Date if possible
	price_org: number
	price_buy_in: number
	id_status: number
	id_user: number
	id_place: number
}

export type RegisterFormSchema = {
	name: string
	surname: string
	email: string
}
