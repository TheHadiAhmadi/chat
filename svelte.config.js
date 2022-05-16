import adapter from '@sveltejs/adapter-auto';
import windicss from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				windicss()
			]
		}
	}
};

export default config;
