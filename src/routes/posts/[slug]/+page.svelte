<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.post.title} - Prateek Rathod</title>
	<meta name="description" content={data.post.description || `Read ${data.post.title} by Prateek Rathod`} />
	{#if data.post.date}
		<meta property="article:published_time" content={data.post.date} />
	{/if}
</svelte:head>

<div class="container">
	<header class="header">
		<nav class="nav">
			<a href="/" class="nav-link" aria-label="Go to homepage">Home</a>
			<span class="nav-separator">→</span>
			<a href="/posts" class="nav-link" aria-label="Go to posts page">Posts</a>
		</nav>
		
		<article class="post-meta">
			<h1 class="post-title">{data.post.title}</h1>
			{#if data.post.date}
				<time class="post-date" datetime={data.post.date}>
					{new Date(data.post.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			{/if}
			{#if data.post.tags && data.post.tags.length > 0}
				<div class="post-tags">
					{#each data.post.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</article>
	</header>

	<main class="content">
		<div class="prose">
			{@html data.post.content}
		</div>
	</main>

	<footer class="footer">
		<a href="/posts" class="back-link">← Back to posts</a>
	</footer>
</div>

<style>
	.container {
		min-height: 100vh;
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.header {
		margin-bottom: 3rem;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
		font-size: 0.875rem;
	}

	.nav-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.nav-link:hover,
	.nav-link:focus {
		color: var(--text-primary);
		text-decoration: underline;
	}

	.nav-separator {
		color: var(--text-secondary);
		opacity: 0.5;
	}

	.post-meta {
		border-bottom: 1px solid var(--border-color, #e5e7eb);
		padding-bottom: 1.5rem;
	}

	.post-title {
		font-family: 'Crimson Text', Georgia, serif;
		font-size: 2.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 1rem 0;
		line-height: 1.1;
	}

	.post-date {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: block;
		margin-bottom: 1rem;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background: var(--bg-secondary, #f3f4f6);
		color: var(--text-secondary);
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-weight: 500;
	}

	.content {
		margin-bottom: 3rem;
	}

	/* Prose styling for markdown content */
	.prose {
		line-height: 1.7;
		color: var(--text-primary);
	}

	.prose :global(h1) {
		font-family: 'Crimson Text', Georgia, serif;
		font-size: 2rem;
		font-weight: 600;
		margin: 2rem 0 1rem 0;
		line-height: 1.2;
		color: var(--text-primary);
	}

	.prose :global(h2) {
		font-family: 'Inter', sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
		margin: 1.75rem 0 0.75rem 0;
		line-height: 1.3;
		color: var(--text-primary);
	}

	.prose :global(h3) {
		font-family: 'Inter', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		margin: 1.5rem 0 0.5rem 0;
		line-height: 1.4;
		color: var(--text-primary);
	}

	.prose :global(p) {
		margin: 1rem 0;
		color: var(--text-primary);
	}

	.prose :global(a) {
		color: var(--theme-color, #6366f1);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
		transition: all 0.2s ease;
	}

	.prose :global(a:hover),
	.prose :global(a:focus) {
		color: var(--text-primary);
		text-decoration-thickness: 2px;
	}

	.prose :global(code) {
		font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
		font-size: 0.875em;
		background: var(--bg-secondary, #f3f4f6);
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		color: var(--text-primary);
	}

	.prose :global(pre) {
		font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
		background: var(--bg-secondary, #f8f9fa);
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
		margin: 1.5rem 0;
		border: 1px solid var(--border-color, #e5e7eb);
	}

	.prose :global(pre code) {
		background: none;
		padding: 0;
		font-size: 0.875rem;
	}

	.prose :global(blockquote) {
		border-left: 4px solid var(--theme-color, #6366f1);
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: var(--text-secondary);
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.prose :global(li) {
		margin: 0.5rem 0;
	}

	.prose :global(hr) {
		border: none;
		height: 1px;
		background: var(--border-color, #e5e7eb);
		margin: 2rem 0;
	}

	.footer {
		border-top: 1px solid var(--border-color, #e5e7eb);
		padding-top: 1.5rem;
	}

	.back-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.back-link:hover,
	.back-link:focus {
		color: var(--text-primary);
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.post-title {
			font-size: 2rem;
		}

		.prose :global(h1) {
			font-size: 1.75rem;
		}

		.prose :global(h2) {
			font-size: 1.375rem;
		}

		.prose :global(h3) {
			font-size: 1.125rem;
		}
	}
</style>