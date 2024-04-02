export interface PaymentMethodGetSchema {
	id: number
	payment_name: string
}

export type PaymentPostSchema = {
	date: string // Should be properly typed as Date if possible
	amount: number
	payment_method_id: number
	user_id: number
	event_id: number
}
