<script lang="ts">
</script>

<svelte:head>
	<title>Garage - Prateek Rathod</title>
	<meta name="description" content="Development tools and utilities built by Prateek Rathod" />
</svelte:head>

<div class="container">
	<header class="header">
		<a href="/" class="back-link" aria-label="Go back to homepage">← Back</a>
		<h1 class="title">Garage</h1>
		<p class="subtitle">Development tools and utilities</p>
	</header>

	<main class="tools-list">
		<article class="tool-item">
			<a href="/garage/json-viewer" class="tool-link">
				<span class="tool-title">JSON Viewer</span>
				<span class="tool-description">Parse, format, and extract TypeScript types from JSON</span>
			</a>
		</article>
	</main>
</div>

<style>
	.container {
		min-height: 100vh;
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
	}

	.header {
		margin-bottom: 2rem;
	}

	.back-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 1rem;
		display: inline-block;
		transition: color 0.2s ease;
	}

	.back-link:hover,
	.back-link:focus {
		color: var(--text-primary);
		text-decoration: underline;
	}

	.title {
		font-family: 'Crimson Text', Georgia, serif;
		font-size: 2.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 0.5rem 0;
		line-height: 1.1;
	}

	.subtitle {
		font-size: 1.1rem;
		color: var(--text-secondary);
		margin: 0;
		font-style: italic;
	}

	.tools-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.tool-item {
		margin-bottom: 0.75rem;
	}

	.tool-item:last-child {
		margin-bottom: 0;
	}

	.tool-link {
		display: block;
		text-decoration: none;
		color: inherit;
		padding: 1rem;
		margin: -1rem;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.tool-link:hover,
	.tool-link:focus {
		background: var(--bg-secondary, rgba(99, 102, 241, 0.05));
		color: var(--text-primary);
		outline: none;
	}

	.tool-title {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: 0.25rem;
	}

	.tool-description {
		display: block;
		font-size: 0.75rem;
		color: var(--text-secondary);
		line-height: 1.4;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.title {
			font-size: 2rem;
		}
	}
</style>
