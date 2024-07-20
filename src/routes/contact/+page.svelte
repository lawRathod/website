<script lang="ts">
	const profiles: { [site: string]: { username: string; url: string } } = {
		linkedin: {
			username: 'prateekrathod',
			url: 'https://www.linkedin.com/in/prateekrathod/'
		},
		'square-x-twitter': {
			username: 'praaaateeeek',
			url: 'https://twitter.com/praaaateeeek'
		},
		'square-github': {
			username: 'lawRathod',
			url: 'https://github.com/lawRathod'
		}
	};
</script>

<div class="container mt-5 d-flex flex-row justify-content-center">
	<div class="text-normal">
		<div>
			{#each Object.keys(profiles) as profile}
				<div class="row">
					<div class="col">
						<i class="fa-brands fa-{profile}" />
						{profiles[profile].username}
						<a href={profiles[profile].url} target="_blank"> , visit </a>
					</div>
				</div>
			{/each}
		</div>
		<div class="text-medium mt-3">
			Buy me a <a href="https://buymeacoffee.com/noodleweb" target="_blank">coffee</a>?
		</div>
	</div>
</div>
