import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	// Check OS preference
	const prefersDark = browser && window.matchMedia('(prefers-color-scheme: dark)').matches;
	
	// Check localStorage or use OS preference
	const stored = browser && localStorage.getItem('theme');
	const initial: Theme = stored ? (stored as Theme) : (prefersDark ? 'dark' : 'light');
	
	const { subscribe, set, update } = writable<Theme>(initial);
	
	return {
		subscribe,
		toggle: () => update(theme => {
			const newTheme = theme === 'light' ? 'dark' : 'light';
			if (browser) {
				localStorage.setItem('theme', newTheme);
				document.documentElement.setAttribute('data-theme', newTheme);
			}
			return newTheme;
		}),
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				document.documentElement.setAttribute('data-theme', theme);
			}
			set(theme);
		},
		init: () => {
			if (browser) {
				document.documentElement.setAttribute('data-theme', initial);
				
				// Listen for OS preference changes
				window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
					const storedTheme = localStorage.getItem('theme');
					// Only update if user hasn't manually set a preference
					if (!storedTheme) {
						const newTheme = e.matches ? 'dark' : 'light';
						set(newTheme);
						document.documentElement.setAttribute('data-theme', newTheme);
					}
				});
			}
		}
	};
}

export const theme = createThemeStore();