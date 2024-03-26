import Input, { Label } from '@/components/Input'
import { CardData, useCart } from '@/context/CartContext'
import { buyGame } from '@/model/payments'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CardRoute() {
	const {
		dispatch,
		state: { cart, card: contextCard, address },
	} = useCart()

	const [card, setCard] = useState<CardData>(contextCard)

	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationFn: (body: Parameters<typeof buyGame>[0]) => buyGame(body),
		onSuccess: () => dispatch({ type: 'setSuccess', payload: true }),
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
		mutate({ cart, address, card })
		navigate('/payments/summary')
	}

	return (
		<article className="w-full flex flex-col gap-3">
			<h1 className="text-2xl">Płatność</h1>
			<section className="flex-1 flex gap-6 flex-col">
				<section className="flex flex-col items-start gap-3 flex-1">
					<div className="card bg-base-100 shadow-xl rounded-2xl p-5 flex flex-col gap-3">
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

				<div className="card bg-base-100 shadow-xl flex-1">
					<div className="card-body">
						<h2 className="card-title">Metoda Płatności</h2>
						<div className="h-[1px] w-full bg-slate-600" />
						<p>Karta płatnicza</p>
					</div>
				</div>
			</section>
			<div className="w-full flex justify-between ">
				<Link className="btn btn-ghost self-end" to="/payments/address">
					Wróć
				</Link>
				<button className="btn btn-primary self-end" onClick={handlePayment}>
					Zapłać
				</button>
			</div>
		</article>
	)
}
