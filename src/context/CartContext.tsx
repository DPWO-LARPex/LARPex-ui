import * as React from 'react'

export type CartItem = {
	id: string
	quantity: number
	name: string
	price: number
}
export type AddressData = {
	city: string
	street: string
	zipCode: string
	number: string
}
export type CardData = {
	cardNumber: string
	cardHolder: string
	cardMonth: string
	cardYear: string
	cardCvv: string
}

type Action =
	| { type: 'addToCart'; payload: CartItem }
	| { type: 'removeFromCart'; payload: string }
	| { type: 'clearCart' }
	| { type: 'setAddress'; payload: AddressData }
	| { type: 'setCard'; payload: CardData }
	| { type: 'setSuccess'; payload: boolean }

type Dispatch = (action: Action) => void

export type State = {
	cart: CartItem[]
	address: AddressData
	card: CardData
	isSuccess: boolean | undefined
}

type CartProviderProps = { children: React.ReactNode }

const CartStateContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined)

function cartReducer(state: State, action: Action) {
	switch (action.type) {
		case 'addToCart': {
			const existingItem = state.cart.find(
				item => item.id === action.payload.id,
			)
			if (existingItem) {
				return {
					...state,
					cart: state.cart.map(item =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity + action.payload.quantity }
							: item,
					),
				}
			}
			return { ...state, cart: [...state.cart, action.payload] }
		}

		case 'removeFromCart': {
			return {
				...state,
				cart: state.cart.filter(item => item.id !== action.payload),
			}
		}

		case 'clearCart': {
			return { ...state, cart: [] }
		}

		case 'setAddress': {
			return { ...state, address: action.payload }
		}

		case 'setCard': {
			return { ...state, card: action.payload }
		}
		case 'setSuccess':
			return { ...state, isSuccess: action.payload }
	}
}

const initialState: State = {
	cart: [
		{
			// TODO: remove this hardcoded data
			id: '1',
			quantity: 1,
			name: 'Larp game',
			price: 9123,
		},
	] as CartItem[],
	isSuccess: undefined,
	address: { city: '', street: '', zipCode: '', number: '' },
	card: {
		cardNumber: '',
		cardHolder: '',
		cardMonth: '',
		cardYear: '',
		cardCvv: '',
	},
}

function CartProvider({ children }: CartProviderProps) {
	const [state, dispatch] = React.useReducer(cartReducer, initialState)

	const value = { state, dispatch }
	return (
		<CartStateContext.Provider value={value}>
			{children}
		</CartStateContext.Provider>
	)
}

function useCart() {
	const context = React.useContext(CartStateContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}

export { CartProvider, useCart }
