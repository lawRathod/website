<script lang="ts">
	import { pages } from './pages';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="container">
	<div>
		<p>️Hii there! :)</p>
	</div>
	<div class="list text-normal">
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
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.rest {
		font-size: 1.2rem;
	}
</style>
