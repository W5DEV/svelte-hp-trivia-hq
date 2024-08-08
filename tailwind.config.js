/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				caveat: ['Caveat', 'cursive']
			},
			colors: {
				'gryffindor-red': '#740001',
				'gryffindor-gold': '#D3A625',
				'hufflepuff-yellow': '#ecb939',
				'hufflepuff-brown': '#372e29',
				'ravenclaw-blue': '#222f5b',
				'ravenclaw-bronze': '#946B2D',
				'slytherin-green': '#1a472a',
				'slytherin-silver': '#bebebe'
			}
		}
	},
	plugins: [require('daisyui')],

	daisyui: {
		themes: [
			{
				default: {
					primary: '#000000',
					secondary: '#000000',
					accent: '#000000',
					neutral: '#000000',
					'base-100': '#ffffff',
					info: '#000000',
					success: '#4bb534',
					warning: '#ecb939',
					error: '#cc0000'
				},
				gryffindor: {
					primary: '#740001',
					secondary: '#D3A625',
					accent: '#740001',
					neutral: '#740001',
					'base-100': '#ffffff',
					info: '#740001',
					success: '#4bb534',
					warning: '#ecb939',
					error: '#cc0000'
				},
				ravenclaw: {
					primary: '#222f5b',
					secondary: '#946B2D',
					accent: '#222f5b',
					neutral: '#222f5b',
					'base-100': '#ffffff',
					info: '#222f5b',
					success: '#4bb534',
					warning: '#ecb939',
					error: '#cc0000'
				},
				hufflepuff: {
					primary: '#ecb939',
					secondary: '#bebebe',
					accent: '#ecb939',
					neutral: '#ecb939',
					'base-100': '#171717',
					info: '#ecb939',
					success: '#4bb534',
					warning: '#ecb939',
					error: '#cc0000'
				},
				slytherin: {
					primary: '#2a623d',
					secondary: '#bebebe',
					accent: '#bebebe',
					neutral: '#2a623d',
					'base-100': '#121212',
					info: '#2a623d',
					success: '#4bb534',
					warning: '#ecb939',
					error: '#cc0000'
				}
			}
		], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'defaultLight', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root' // The element that receives theme color CSS variables
	}
};
