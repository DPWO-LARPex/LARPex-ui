export interface PaymentMethodGetSchema {
	id: number
	payment_name: string
}

export type PaymentPostSchema = {
	date: string // Should be properly typed as Date if possible
	amount: number
	payment_method_id: number
	user_id: number
	payment_target: 'event' | 'game' | 'microitem'
	payment_target_id: number
}
