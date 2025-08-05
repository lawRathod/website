<script lang="ts">
</script>

<svelte:head>
	<title>Prateek Rathod - Full Stack Engineer</title>
	<meta
		name="description"
		content="Prateek Rathod is a Full Stack Engineer pursuing MS Computer Science at RPTU Kaiserslautern-Landau, specializing in blockchain, high-performance web services, and cloud engineering."
	/>
	<meta name="author" content="Prateek Rathod" />
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>
<div class="container">
	<main id="main-content" class="hero" role="main" aria-label="Personal portfolio">
		<h1 class="name">Prateek Rathod</h1>
		<p class="passion">Passionate about building friendly technologies</p>

		<p class="title">Tech Swiss Army Knife (Engineer)</p>
		<p class="location"><span aria-label="Location">📍</span> Kaiserslautern, Germany</p>
		<section class="current" aria-labelledby="current-status">
			<h2 id="current-status" class="visually-hidden">Current Status</h2>
			<div class="current-item">
				<span class="label">Currently</span>
				<span class="value">MS Computer Science at RPTU Kaiserslautern-Landau</span>
			</div>
			<div class="current-item">
				<span class="label">Working at</span>
				<span class="value">Zondax GmbH • Full Stack Engineer</span>
			</div>
		</section>

		<section class="interests-section" aria-labelledby="interests-title">
			<h2 id="interests-title" class="section-title">Key Interests and Experience</h2>
			<ul class="highlights" role="list">
				<li class="highlight">
					<span class="icon" aria-hidden="true">🔗</span>
					<span class="text">Blockchain & DeFi Infrastructure</span>
				</li>
				<li class="highlight">
					<span class="icon" aria-hidden="true">⚡</span>
					<span class="text">High-Performance Web Services</span>
				</li>
				<li class="highlight">
					<span class="icon" aria-hidden="true">☁️</span>
					<span class="text">Cloud & DevOps Engineering</span>
				</li>
				<li class="highlight">
					<span class="icon" aria-hidden="true">🤖</span>
					<span class="text">AI & Machine Learning</span>
				</li>
			</ul>
		</section>

		<nav class="pages-section" aria-labelledby="pages-title">
			<h2 id="pages-title" class="section-title">Pages</h2>
			<ul class="pages" role="list">
				<li><a href="/garage" class="page-link" aria-describedby="garage-desc">Garage</a></li>
				<li><a href="/posts" class="page-link" aria-describedby="posts-desc">Posts</a></li>
			</ul>
			<div class="visually-hidden">
				<span id="garage-desc">Personal projects and experiments</span>
				<span id="posts-desc">Blog posts and technical writing</span>
			</div>
		</nav>

		<section class="contact-section" aria-labelledby="contact-title">
			<h2 id="contact-title" class="section-title">Contact</h2>
			<ul class="contacts" role="list">
				<li class="contact-item">
					<span class="contact-platform">GitHub</span>
					<a
						href="https://github.com/prateekrathod"
						class="contact-handle"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit Prateek's GitHub profile">@lawrathod</a
					>
				</li>
				<li class="contact-item">
					<span class="contact-platform">LinkedIn</span>
					<a
						href="https://linkedin.com/in/prateekrathod"
						class="contact-handle"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Connect with Prateek on LinkedIn">@prateekrathod</a
					>
				</li>
				<li class="contact-item">
					<span class="contact-platform">X</span>
					<a
						href="https://x.com/prateekrathod"
						class="contact-handle"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Follow Prateek on X (formerly Twitter)">@praaaateeeek</a
					>
				</li>
			</ul>
		</section>
	</main>
</div>

<style>
	/* Skip link for screen readers */
	.skip-link {
		position: absolute;
		top: -40px;
		left: 0.5rem;
		background: var(--text-primary);
		color: var(--bg-primary);
		padding: 0.5rem 1rem;
		text-decoration: none;
		border-radius: 4px;
		z-index: 1000;
		font-weight: 600;
	}

	.skip-link:focus {
		top: 0.5rem;
	}

	/* Visually hidden utility class */
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.hero {
		text-align: left;
		max-width: 500px;
		width: 100%;
	}

	.name {
		font-size: 2.5rem;
		font-weight: 600;
		color: var(--text-primary);
		letter-spacing: -0.02em;
	}

	.passion {
		font-size: 1rem;
		color: var(--text-secondary);
		margin-bottom: 2rem;
		font-weight: 400;
		font-style: italic;
	}

	.pages {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		list-style: none;
		padding: 0;
	}

	.pages li {
		margin: 0;
	}

	.page-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 400;
		transition: color 0.2s ease;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		margin: -0.5rem -1rem;
		display: inline-block;
	}

	.page-link:hover,
	.page-link:focus {
		color: var(--text-primary);
		text-decoration: underline;
	}

	.page-link:focus {
		text-decoration: underline;
	}

	.title {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
		font-weight: 400;
	}

	.location {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 400;
		margin-bottom: 2rem;
	}

	.current {
		margin-bottom: 2rem;
	}

	.current-item {
		margin-bottom: 1rem;
	}

	.current-item:last-child {
		margin-bottom: 0;
	}

	.section {
		margin-bottom: 1rem;
	}

	.section-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
		letter-spacing: -0.01em;
	}

	.label {
		font-size: 0.75rem;
		color: var(--text-secondary);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		display: block;
		margin-bottom: 0.25rem;
	}

	.value {
		font-size: 0.95rem;
		color: var(--text-primary);
		font-weight: 500;
		line-height: 1.4;
	}

	.highlights {
		margin-bottom: 2rem;
		list-style: none;
		padding: 0.5rem 0;
	}

	.highlight {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.highlight:last-child {
		margin-bottom: 0;
	}

	.icon {
		font-size: 0.8rem;
		min-width: 1rem;
		opacity: 0.7;
	}

	.text {
		font-size: 0.875rem;
		color: var(--text-primary);
		font-weight: 400;
	}

	.contacts {
		margin-bottom: 0;
		list-style: none;
		padding: 0;
	}

	.contacts li {
		margin: 0;
	}

	.contact-item {
		display: flex;
		column-gap: 1rem;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.contact-item:last-child {
		margin-bottom: 0;
	}

	.contact-platform {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.contact-handle {
		font-size: 0.875rem;
		color: var(--text-primary);
		text-decoration: none;
		font-weight: 400;
		transition: all 0.2s ease;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		margin: -0.5rem -1rem;
		display: inline-block;
	}

	.contact-handle:hover,
	.contact-handle:focus {
		color: var(--text-primary);
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.name {
			font-size: 2rem;
		}

		.page-link {
			padding: 0.5rem;
			margin: -0.5rem;
		}

		.contact-handle {
			padding: 0.5rem;
			margin: -0.5rem;
		}
	}

	@media (max-width: 480px) {
		.name {
			font-size: 1.75rem;
		}

		.title {
			font-size: 1rem;
		}

		.location {
			font-size: 0.8rem;
		}

		.pages {
			flex-direction: column;
			gap: 1rem;
		}
	}

	/* Respect reduced motion preferences */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.page-link:focus,
		.contact-handle:focus {
			color: var(--text-primary);
			text-decoration: underline;
		}
	}

	/* Ensure minimum touch target size */
	@media (pointer: coarse) {
		.page-link,
		.contact-handle {
			min-height: 44px;
			min-width: 44px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}

		.contact-item {
			min-height: 44px;
		}
	}
</style>
