import { State } from '@/context/PaymentContext'
import { client } from '../client'

export const sendPayment = async (body: Omit<State, 'isSuccess' | 'card'>) => {
	return client('/pay-api/payment-gateway', {
		method: 'POST',
		body: { ...body.paymentSetup },
	})
}
