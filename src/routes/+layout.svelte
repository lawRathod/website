<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let route = '';

	$: route = page.url.pathname;
	$: showThemeToggle = route.startsWith('/garage') || route.startsWith('/posts');

	onMount(() => {
		theme.init();
	});

	function toggleTheme() {
		theme.toggle();
	}
</script>

<!-- Floating theme toggle for garage and posts routes -->
{#if showThemeToggle}
	<button class="floating-theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
		{#if $theme === 'light'}
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
			</svg>
		{:else}
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<circle cx="12" cy="12" r="5"></circle>
				<path
					d="m12 1 0 2m0 18 0 2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12l2 0m18 0 2 0M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
				></path>
			</svg>
		{/if}
	</button>
{/if}

<slot />

<style>
	.floating-theme-toggle {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 56px;
		height: 56px;
		border: 1px solid var(--border-color);
		background: var(--bg-card);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		color: var(--text-secondary);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(20px);
		z-index: 1000;
	}

	.floating-theme-toggle:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
		border-color: var(--theme-color);
		transform: scale(1.05);
		box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
	}

	@media (max-width: 768px) {
		.floating-theme-toggle {
			bottom: 1.5rem;
			right: 1.5rem;
			width: 48px;
			height: 48px;
		}
	}
</style>
