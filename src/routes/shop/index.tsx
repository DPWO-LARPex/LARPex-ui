import PaymentMethod from '@/components/PaymentMethod'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type MicrostoreItems = {
	id: number
	name: string
	description: string
	price: number
}

export default function Shop() {
	const navigate = useNavigate()
	const [selectedItem, setSelectedItem] = useState<number | null>(null)
	const [paymentId, setPaymentId] = useState<number>(0)

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
		navigate('/payments')
	}

	return (
		<div className="my-12 px-28 py-12 flex flex-col gap-3">
			<div className="flex gap-5 justify-between flex-wrap">
				{storeItemsQuery.data?.map(({ name, price, id, description }) => (
					<div className="card w-96 bg-base-100 shadow-xl" key={id}>
						<div className="card-body">
							<h2 className="card-title">{name}</h2>
							<h3 className="card-title">{description}</h3>
							<p>{price}$</p>
							<div className="card-actions justify-start">
								<button
									className={`btn btn-teritary ${selectedItem === id ? 'bg-red-500 hover:bg-red-600' : ''}`}
									onClick={() => handleSelectItem(id)}
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
				disabled={!selectedItem || !paymentId}
				onClick={handleNext}
			>
				Dalej
			</button>
		</div>
	)
}
