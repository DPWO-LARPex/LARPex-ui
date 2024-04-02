import { PaymentPostSchema } from '@/model/paymentsGateway/types'
import * as React from 'react'

export type PaymentSetupData = PaymentPostSchema
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

type PaymentProviderProps = { children: React.ReactNode }

const PaymentStateContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined)

function cartReducer(state: State, action: Action) {
	switch (action.type) {
		case 'setPaymentSetup': {
			return { ...state, paymentSetup: action.payload }
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
		amount: 0,
		event_id: 0,
		payment_method_id: 0,
		user_id: 0,
		date: '',
	},
	card: {
		cardNumber: '',
		cardHolder: '',
		cardMonth: '',
		cardYear: '',
		cardCvv: '',
	},
}

function PaymentProvider({ children }: PaymentProviderProps) {
	const [state, dispatch] = React.useReducer(cartReducer, initialState)

	const value = { state, dispatch }
	return (
		<PaymentStateContext.Provider value={value}>
			{children}
		</PaymentStateContext.Provider>
	)
}

function usePayment() {
	const context = React.useContext(PaymentStateContext)
	if (context === undefined) {
		throw new Error('usePayment must be used within a PaymentProvider')
	}
	return context
}

export { PaymentProvider, usePayment }
