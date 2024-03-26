import Input from '@/components/Input'
import { AddressData, useCart } from '@/context/CartContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddressRoute() {
	const { dispatch } = useCart()

	const [address, setAddress] = useState<AddressData>({
		city: '',
		street: '',
		zipCode: '',
		number: '',
	})

	const { city, street, zipCode, number } = address

	const handleNext = () => {
		dispatch({
			type: 'setAddress',
			payload: address,
		})
	}

	const handleCardChange =
		(field: keyof AddressData) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target
			setAddress(prev => ({ ...prev, [field]: value }))
		}

	return (
		<div className="w-100 p-5">
			<h2 className="text-3xl pb-3">Address</h2>
			<div className="flex flex-col gap-4">
				<Input
					label="City"
					description="Insert city name"
					inputProps={{
						value: city,
						onChange: handleCardChange('city'),
					}}
				/>
				<Input
					label="Street"
					description="Insert street name"
					inputProps={{
						value: street,
						onChange: handleCardChange('street'),
					}}
				/>
				<Input
					label="Zip code"
					description="Insert zip code"
					inputProps={{
						value: zipCode,
						onChange: handleCardChange('zipCode'),
					}}
				/>
				<Input
					label="Number"
					description="Insert number"
					inputProps={{
						value: number,
						onChange: handleCardChange('number'),
					}}
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
