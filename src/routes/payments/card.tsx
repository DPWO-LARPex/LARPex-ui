import Input, { Label } from '@/components/Input'
import { CardData, usePayment } from '@/context/PaymentContext'
import { sendPayment } from '@/model/payments'
import { PaymentMethodGetSchema } from '@/model/paymentsGateway/types'
import { formatCurrencyAmount } from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CardRoute() {
	const {
		dispatch,
		state: { card: contextCard, paymentSetup, actionCallback },
	} = usePayment()

	console.log(contextCard, paymentSetup)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data } = useQuery<PaymentMethodGetSchema>({
		queryKey: ['pay-api', 'payment-gateway', paymentSetup?.payment_method_id],
	})

	const [card, setCard] = useState<CardData>(contextCard)

	const navigate = useNavigate()

	const { mutate } = useMutation<{ id: number }>({
		mutationFn: (body: Parameters<typeof sendPayment>[0]) => sendPayment(body),
		onSuccess: res => {
			dispatch({ type: 'setSuccess', payload: true })
			actionCallback?.(res.id)
		},
		onError: () => dispatch({ type: 'setSuccess', payload: false }),
	})

	const { cardNumber, cardHolder, cardMonth, cardYear, cardCvv } = card

	const handleCardChange =
		(field: keyof CardData) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target
			setCard(prev => ({ ...prev, [field]: value }))
		}

	const handlePayment = () => {
		dispatch({ type: 'setCard', payload: card })
		mutate({ paymentSetup })
		navigate('/payments/summary')
	}

	return (
		<article className="w-full flex flex-col gap-3">
			<h1 className="text-2xl">Płatność - {data?.payment_name}</h1>
			<p>{`Do zapłaty: ${formatCurrencyAmount(paymentSetup.amount)}`}</p>
			<section className="flex-1 flex gap-6 flex-col lg:flex-row">
				<section className="flex flex-col items-start gap-3 flex-1">
					<div className="card w-full bg-base-100 shadow-xl rounded-2xl p-5 flex flex-col gap-3">
						<p className="card-title">Karta płatnicza</p>
						<Input
							label="Numer karty płatniczej"
							description="Wprowadź 16 cyfrowy numer karty"
							inputProps={{
								value: cardNumber,
								onChange: handleCardChange('cardNumber'),
							}}
						/>
						<Input
							label="Właściciel karty"
							description="Wprowadź imię i nazwisko na karcie"
							inputProps={{
								value: cardHolder,
								onChange: handleCardChange('cardHolder'),
							}}
						/>
						<div className="flex w-full justify-between gap-3 flex-col md:flex-row">
							<div className="flex-1 flex md:items-center gap-2 md:flex-row flex-col">
								<Label
									label="Data ważności"
									description="Wprowadź datę ważności karty"
								/>
								<div className="flex flex-row items-center">
									<input
										type="number"
										max={12}
										value={cardMonth}
										onChange={handleCardChange('cardMonth')}
										className="input min-w-[64px] input-bordered w-full max-w-xs"
									/>
									/{' '}
									<input
										type="number"
										max={99}
										value={cardYear}
										onChange={handleCardChange('cardYear')}
										className="input min-w-[64px] input-bordered w-full max-w-xs"
									/>
								</div>
							</div>
							<div className="flex gap-2 md:flex-row flex-col">
								<Label label="CVV" description="Security code" />
								<input
									type="number"
									value={cardCvv}
									className="input input-bordered max-w-xs"
									onChange={handleCardChange('cardCvv')}
								/>
							</div>
						</div>
					</div>
				</section>

				{/* <div className="card bg-base-100 shadow-xl flex-1">
					<div className="card-body">
						<h2 className="card-title">Metoda Płatności</h2>
						<div className="h-[1px] w-full bg-slate-600" />
						<p>Karta płatnicza</p>
					</div>
				</div> */}
			</section>
			<div className="w-full flex justify-end pt-2">
				<button className="btn btn-primary self-end" onClick={handlePayment}>
					Zapłać
				</button>
			</div>
		</article>
	)
}
