<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Posts - Prateek Rathod</title>
	<meta
		name="description"
		content="Technical posts and thoughts by Prateek Rathod on blockchain, web development, and engineering."
	/>
</svelte:head>

<div class="container">
	<header class="header">
		<a href="/" class="back-link" aria-label="Go back to homepage">← Back</a>
		<h1 class="title">Posts</h1>
		<p class="subtitle">Technical thoughts, project updates and learnings</p>
	</header>

	<main class="posts-list">
		{#if data.posts.length === 0}
			<div class="empty-state">
				<p>No posts yet. Check back soon!</p>
			</div>
		{:else}
			<ul style="list-style-type: disc; margin-left: 1.5rem;">
				{#each data.posts as post}
					<li class="post-item">
						<article>
							<a href="/posts/{post.slug}" class="post-link">
								<span class="post-title">{post.title}</span>
								{#if post.date}
									<time class="post-date" datetime={post.date}>
										{new Date(post.date).getFullYear()}
									</time>
								{/if}
							</a>
						</article>
					</li>
				{/each}
			</ul>
		{/if}
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

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		color: var(--text-secondary);
	}

	.post-item {
		margin-bottom: 0.75rem;
	}

	.post-item:last-child {
		margin-bottom: 0;
	}

	.post-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-decoration: none;
		color: inherit;
		padding: 0.5rem 1rem;
		margin: -0.5rem -1rem;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.post-link:hover,
	.post-link:focus {
		color: var(--text-primary);
		text-decoration: underline;
	}

	.post-title {
		font-size: 0.875rem;
		font-weight: 400;
		color: var(--text-primary);
		line-height: 1.4;
	}

	.post-date {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.title {
			font-size: 2rem;
		}

		.post-link {
			padding: 0.5rem;
			margin: -0.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.post-link {
			transition: none;
		}
	}
</style>
