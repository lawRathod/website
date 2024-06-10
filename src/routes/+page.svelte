<script lang="ts">
	import { pages } from './pages';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="container">
	<div class="topLine" />
	<div>
		<p>️Hii there! :)</p>
	</div>
	<div class="list">
		<p>Pick one:</p>
		<ul>
			{#each pages as e}
				<li><a href={`/${e}`}>{e.toLocaleUpperCase()}</a></li>
			{/each}
		</ul>
	</div>
	<div class="rest">
		<p>BTW, I am <u>Prateek</u>!! Nice to have you here...</p>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Tiny5&display=swap');

	.container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		font-size: 3rem;
		font-weight: 600;
		font-family: 'Tiny5', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.list {
		font-size: 1.5rem;
	}

	.rest {
		font-size: 1rem;
	}

	.topLine {
		width: 100%;
		height: 2px;
		background-color: black;
	}
</style>
