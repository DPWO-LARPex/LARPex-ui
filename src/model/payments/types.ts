// Payment schemas
export type PaymentGetSchema = {
	id: number
	date: string // Should be properly typed as Date if possible
	amount: number
	payment_method_id: number
	user_id: number
	event_id: number
}
