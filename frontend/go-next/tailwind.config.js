/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				black: '#081428',
				grey: '#AEB3B7',
				blue5: '#0A323C',
				gold4: '#C89B3C',
				teal: '#0497AB',
			},
		},
	},
	plugins: [],
};
