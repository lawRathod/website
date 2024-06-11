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
	.list {
		font-size: 1.5rem;
	}

	.rest {
		font-size: 1.2rem;
	}

	.topLine {
		width: 100%;
		height: 3px;
		background-color: rgb(52, 52, 55);
	}
</style>
