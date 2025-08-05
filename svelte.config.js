// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	//
	// SSG adaptor
	// kit: {
	//   adapter: adapter({
	//     fallback: 'index.html'
	//   })
	// }
	//
	// Vercel adaptor
	kit: {
		adapter: adapter({
			// see the 'Deployment configuration' section below
		})
	}
};

export default config;
