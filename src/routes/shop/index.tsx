import PaymentMethod from '@/components/PaymentMethod'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const mockedItems = [
	{
		id: '12',
		ammount: 100,
		price: 10,
	},
	{
		id: '1',
		ammount: 500,
		price: 50,
	},
	{
		id: '124',
		ammount: 1000,
		price: 100,
	},
]

export default function Shop() {
	const navigate = useNavigate()
	const [selectedItem, setSelectedItem] = useState('')
	const [paymentId, setPaymentId] = useState<number>(0)

	const handleSelectItem = (id: string) => {
		if (selectedItem === id) {
			return setSelectedItem('')
		}
		setSelectedItem(id)
	}

	const handleNext = () => {
		navigate('/payments')
	}

	return (
		<div className="my-12 px-28 py-12 flex flex-col gap-3">
			<div className="flex gap-5 justify-between flex-wrap">
				{mockedItems.map(({ ammount, price, id }) => (
					<div className="card w-96 bg-base-100 shadow-xl" key={id}>
						<div className="card-body">
							<h2 className="card-title">Wirtualna waluta</h2>
							<h3 className="card-title">{ammount} monet</h3>
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
