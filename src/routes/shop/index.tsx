import PaymentMethod from '@/components/PaymentMethod'
import { usePayment } from '@/context/PaymentContext'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type MicrostoreItems = {
	item_id: number
	name: string
	description: string
	price: number
}

export default function Shop() {
	const navigate = useNavigate()
	const { dispatch } = usePayment()
	const [selectedItem, setSelectedItem] = useState<number | null>(null)
	const [paymentId, setPaymentId] = useState<number | null>(null)

	const storeItemsQuery = useQuery<MicrostoreItems[]>({
		queryKey: ['api/microstore/items'],
	})

	const handleSelectItem = (id: number) => {
		if (selectedItem === id) {
			return setSelectedItem(null)
		}
		setSelectedItem(id)
	}

	const handleNext = () => {
		const selectedItemData = storeItemsQuery.data?.find(
			({ item_id }) => item_id === selectedItem,
		)

		dispatch({
			type: 'setPaymentSetup',
			payload: {
				data: {
					amount: 100,
					payment_target: 'microitem',
					payment_target_id: Number(selectedItemData?.item_id),
					payment_method_id: 1,
					user_id: 1,
					date: new Date().toISOString(),
				},
			},
		})
		navigate('/payments')
	}

	return (
		<div className="my-12 px-28 py-12 flex flex-col gap-3">
			<div className="flex gap-5 justify-between flex-wrap">
				{storeItemsQuery.data?.map(({ name, item_id, description }) => (
					<div className="card w-96 bg-base-100 shadow-xl" key={item_id}>
						<div className="card-body">
							<h2 className="card-title">{name}</h2>
							<h3 className="card-title">{description}</h3>
							<div className="card-actions justify-start">
								<button
									className={`btn btn-teritary ${selectedItem === item_id ? 'bg-red-500 hover:bg-red-600' : ''}`}
									onClick={() => handleSelectItem(item_id)}
								>
									Wybierz
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<PaymentMethod paymentId={paymentId} setPaymentId={setPaymentId} />
			<button
				className="btn bg-red-500 hover:bg-red-600"
				disabled={isNil(selectedItem) || isNil(paymentId)}
				onClick={handleNext}
			>
				Dalej
			</button>
		</div>
	)
}

const isNil = (value: unknown) => value === null || value === undefined
