<!-- <slot /> -->

<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	let route = '';
	const storeUpdated = () => {
		route = $page.url.pathname;
		// console.log(route);
	};

	afterNavigate(storeUpdated);
</script>

<div class="topLine" />
<nav>
	{#if route && route !== '/'}
		<a href={`/`}>Home</a>
		{route}
	{/if}
</nav>

<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Tiny5&display=swap');

	:global(body) {
		color: rgb(52, 52, 55);
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		font-size: 3rem;
		font-weight: 600;
		font-family: 'Tiny5', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(.text-normal) {
		font-size: 1.5rem;
	}

	:global(.text-small) {
		font-size: 1.2rem;
	}

	:global(.text-medium) {
		font-size: 1.7rem;
	}

	.topLine {
		margin-top: 10px;
		width: 90%;
		height: 8px;
		background-color: rgb(52, 52, 55);
	}
</style>
