import { useCart } from '@/context/CartContext'
import { Dispatch, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddressRoute() {
	const { state, dispatch } = useCart()

	const [city, setCity] = useState(state.address.city ?? '')
	const [street, setStreet] = useState(state.address.street ?? '')
	const [zipCode, setZipCode] = useState(state.address.zipCode ?? '')
	const [number, setNumber] = useState(state.address.number ?? '')

	const handleNext = () => {
		dispatch({
			type: 'setAddress',
			payload: { city, street, zipCode, number },
		})
	}

	return (
		<div className="w-100 p-5">
			<h2 className="text-3xl pb-3">Address</h2>
			<div className="flex flex-col gap-4">
				<Input
					label="City"
					description="Insert city name"
					value={city}
					onChange={setCity}
				/>
				<Input
					label="Street"
					description="Insert street name"
					value={street}
					onChange={setStreet}
				/>
				<Input
					label="Zip code"
					description="Insert zip code"
					value={zipCode}
					onChange={setZipCode}
				/>
				<Input
					label="Number"
					description="Insert number"
					value={number}
					onChange={setNumber}
				/>
			</div>
			<div className="flex justify-between pt-3">
				<Link to="/payments" className="btn btn-ghost">
					Back
				</Link>
				<Link
					onClick={handleNext}
					to="/payments/card"
					className="btn btn-primary"
				>
					Next
				</Link>
			</div>
		</div>
	)
}

const Input = ({
	label,
	description,
	value,
	onChange,
}: {
	label: string
	description: string
	value: string
	onChange: Dispatch<SetStateAction<string>>
}) => {
	return (
		<div className="w-full flex items-center gap-3">
			<div className="flex flex-col min-w-36">
				<span className="p-0 m-0 font-bold">{label}</span>
				<span className="p-0 m-0 text-stone-500">{description}</span>
			</div>
			<input
				type="text"
				placeholder="Type here"
				className="input input-bordered w-full max-w-xs"
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	)
}
