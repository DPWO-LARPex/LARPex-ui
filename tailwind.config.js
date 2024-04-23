import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	safelist: ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-gray-500'],
	plugins: [typography, daisyui],
}
