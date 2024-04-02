import * as React from 'react'

export type PaymentSetupData = {
	userId: number | undefined
	eventId: number | undefined
	paymentMethodId: number | undefined
}
export type CardData = {
	cardNumber: string
	cardHolder: string
	cardMonth: string
	cardYear: string
	cardCvv: string
}

type Action =
	| { type: 'setPaymentSetup'; payload: PaymentSetupData }
	| { type: 'setCard'; payload: CardData }
	| { type: 'setSuccess'; payload: boolean }

type Dispatch = (action: Action) => void
export type State = {
	paymentSetup: PaymentSetupData
	card: CardData
	isSuccess: boolean | undefined
}

type CartProviderProps = { children: React.ReactNode }

const CartStateContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined)

function cartReducer(state: State, action: Action) {
	switch (action.type) {
		case 'setPaymentSetup': {
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
	isSuccess: undefined,
	paymentSetup: {
		userId: undefined,
		eventId: undefined,
		paymentMethodId: undefined,
	},
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
