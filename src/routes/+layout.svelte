<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let route = '';
	const storeUpdated = () => {
		route = page.url.pathname;
	};

	afterNavigate(storeUpdated);
	
	onMount(() => {
		theme.init();
	});
	
	function toggleTheme() {
		theme.toggle();
	}
</script>

<div class="topLine"></div>
<nav>
	<div class="nav-content">
		{#if route && route !== '/'}
			<div class="nav-links">
				<a href={`/`}>Home</a>
				<span class="route-indicator">{route}</span>
			</div>
		{/if}
		<button 
			class="theme-toggle" 
			on:click={toggleTheme}
			aria-label="Toggle dark mode"
			title={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
		>
			{#if $theme === 'light'}
				🌙
			{:else}
				☀️
			{/if}
		</button>
	</div>
</nav>

<slot />

<style>
	.topLine {
		width: 100%;
		height: 8px;
		background-color: var(--theme-color);
	}
	
	nav {
		width: 100%;
		padding: 1rem 2rem;
		background-color: var(--bg-secondary);
		border-bottom: 1px solid var(--border-color);
	}
	
	.nav-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 2rem;
	}
	
	.nav-links {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1.5rem;
	}
	
	.route-indicator {
		color: var(--text-secondary);
	}
	
	.theme-toggle {
		font-size: 2rem;
		background: none;
		border: 2px solid var(--border-color);
		border-radius: 50%;
		width: 3.5rem;
		height: 3.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		margin-left: auto;
	}
	
	.theme-toggle:hover {
		transform: scale(1.1);
		border-color: var(--theme-color);
		background-color: var(--bg-card);
		box-shadow: 0 0 20px var(--shadow-color);
	}
	
	.theme-toggle:active {
		transform: scale(0.95);
	}
	
	@media (max-width: 768px) {
		nav {
			padding: 1rem;
		}
		
		.nav-links {
			font-size: 1.2rem;
		}
		
		.theme-toggle {
			width: 3rem;
			height: 3rem;
			font-size: 1.5rem;
		}
	}
</style>