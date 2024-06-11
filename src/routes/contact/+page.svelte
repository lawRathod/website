<script lang="ts">
	const profiles: {[site: string]: string} = {
		linkedin: 'prateekrathod',
		'x-twitter': 'praaaateeeek',
		github: 'lawRathod'
	};
</script>

<a href="/">Home</a>
<div class="container text-center">
	{#each Object.keys(profiles) as profile}
		<div class="row">
			<div class="col">
				<i class="fa-brands fa-{profile}" />
			</div>
			<div class="col">{profiles[profile]}</div>
		</div>
	{/each}
</div>
