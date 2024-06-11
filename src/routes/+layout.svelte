<slot />

<!-- <script>
	import { pages } from './pages';
</script>

<nav>
	{#each pages as e}
		<a href={`/${e}`}>{e.toLocaleUpperCase()}</a>
	{/each}
</nav>

<slot /> -->

<style>
	@import url('https://fonts.googleapis.com/css2?family=Tiny5&display=swap');

	:global(body)  {
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
</style>
