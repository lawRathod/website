<!-- <slot /> -->
<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';

	let route = '';
	const storeUpdated = () => {
		route = page.url.pathname;
		// console.log(route);
	};

	afterNavigate(storeUpdated);
</script>

<div class="topLine"></div>
<nav>
	{#if route && route !== '/'}
		<a href={`/`}>Home</a>
		{route}
	{/if}
</nav>

<slot />

<style>
	.topLine {
		width: 100%;
		height: 8px;
		background-color: var(--theme-color);
	}
</style>
