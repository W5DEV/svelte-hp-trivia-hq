/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],

	daisyui: {
		themes: [
			{
				hpLight: {
					primary: '#740001',
					secondary: '#00780e',
					accent: '#eeba30',
					neutral: '#726255',
					'base-100': '#f1f1f1',
					info: '#375798',
					success: '#4bb534',
					warning: '#ecb939',
					error: '#cc0000'
				},
				hpDark: {
					primary: '#d3a625',
					secondary: '#00780e',
					accent: '#375798',
					neutral: '#5d5d5d',
					'base-100': '#372e29',
					info: '#bebebe',
					success: '#4bb534',
					warning: '#ecb939',
					error: '#cc0000'
				}
			}
		], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'hpLight', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root' // The element that receives theme color CSS variables
	}
};
