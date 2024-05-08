import { PaymentMethodGetSchema } from '@/model/paymentsGateway/types'
import { useQuery } from '@tanstack/react-query'
import { Label } from './Input'

export default function PaymentMethod({
	paymentId,
	setPaymentId,
}: {
	paymentId: number
	setPaymentId: (id: number) => void
}) {
	const paymentsMethods = useQuery<PaymentMethodGetSchema[]>({
		queryKey: ['pay-api/payment-gateway'],
	})
	return (
		<div>
			<p>Metoda płatności</p>
			{paymentsMethods.data?.map(payment => {
				return (
					<div key={payment.id} className="flex gap-5">
						<input
							type="radio"
							name="payment"
							id={payment.id?.toString()}
							checked={payment.id === paymentId}
							onChange={() => setPaymentId(payment.id || 0)}
						/>
						<Label
							htmlFor={payment.id?.toString()}
							label={payment.payment_name}
						/>
					</div>
				)
			})}
		</div>
	)
}
