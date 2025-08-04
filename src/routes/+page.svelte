<script lang="ts">
	import { pages, pageDetails } from './pages';
	import { onMount } from 'svelte';
	
	let ready = false;
	let hoveredIndex: number | null = null;
	
	onMount(() => {
		ready = true;
	});
	
	function handleMouseEnter(index: number) {
		hoveredIndex = index;
	}
	
	function handleMouseLeave() {
		hoveredIndex = null;
	}
</script>

<svelte:head>
	<title>Prateek Rathod - Software Engineer</title>
</svelte:head>

<div class="container" class:ready>
	<header class="hero">
		<h1 class="title">
			<span class="greeting">Hey, I'm</span>
			<span class="name">Prateek Rathod</span>
		</h1>
		<p class="subtitle">Software Engineer crafting digital experiences</p>
		<div class="tagline">
			<span class="tag">🚀 Builder</span>
			<span class="tag">💡 Creator</span>
			<span class="tag">🎯 Problem Solver</span>
		</div>
	</header>

	<section class="explore">
		<h2 class="explore-title">Explore My Universe</h2>
		<div class="cards">
			{#each pages as page, i}
				<a 
					href={`/${page}`} 
					class="card"
					class:hovered={hoveredIndex === i}
					on:mouseenter={() => handleMouseEnter(i)}
					on:mouseleave={handleMouseLeave}
					style="animation-delay: {i * 0.1}s"
				>
					<div class="card-icon">{pageDetails[page].icon}</div>
					<h3 class="card-title">{page.toUpperCase()}</h3>
					<p class="card-description">{pageDetails[page].description}</p>
					<div class="card-arrow">→</div>
				</a>
			{/each}
		</div>
	</section>

	<footer class="footer">
		<p class="status">
			<span class="status-dot"></span>
			Available for exciting projects
		</p>
	</footer>
</div>

<style>
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		opacity: 0;
		transition: opacity 0.5s ease-in;
	}
	
	.container.ready {
		opacity: 1;
	}

	.hero {
		text-align: center;
		margin: 3rem 0 4rem;
		animation: slideDown 0.8s ease-out;
	}

	.title {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.greeting {
		font-size: 2rem;
		color: #666;
		font-weight: 400;
	}

	.name {
		font-size: 4rem;
		background: linear-gradient(135deg, var(--theme-color), #00d4ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: glow 3s ease-in-out infinite;
	}

	.subtitle {
		font-size: 1.5rem;
		color: #666;
		font-weight: 400;
		margin-bottom: 1.5rem;
	}

	.tagline {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.tag {
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
		background: rgba(3, 169, 244, 0.1);
		border-radius: 2rem;
		color: var(--theme-color);
		border: 2px solid transparent;
		transition: all 0.3s ease;
	}

	.tag:hover {
		border-color: var(--theme-color);
		transform: translateY(-2px);
	}

	.explore {
		width: 100%;
		max-width: 1200px;
		margin-bottom: 4rem;
	}

	.explore-title {
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 3rem;
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.explore-title::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 4px;
		background: var(--theme-color);
		border-radius: 2px;
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		padding: 1rem;
		justify-content: center;
	}

	.card {
		flex: 0 1 calc(25% - 1.5rem);
		min-width: 250px;
		max-width: 300px;
		position: relative;
		padding: 2.5rem 2rem;
		background: #fff;
		border: 3px solid #f0f0f0;
		border-radius: 1rem;
		text-align: center;
		transition: all 0.3s ease;
		cursor: pointer;
		overflow: hidden;
		animation: fadeIn 0.6s ease-out forwards;
		opacity: 0;
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 5px;
		background: linear-gradient(90deg, var(--theme-color), #00d4ff);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	.card:hover {
		transform: translateY(-8px);
		border-color: var(--theme-color);
		box-shadow: 0 20px 40px rgba(3, 169, 244, 0.2);
	}

	.card:hover::before {
		transform: scaleX(1);
	}

	.card-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		animation: bounce 2s ease-in-out infinite;
		animation-delay: var(--bounce-delay, 0s);
	}

	.card:nth-child(1) .card-icon { --bounce-delay: 0s; }
	.card:nth-child(2) .card-icon { --bounce-delay: 0.2s; }
	.card:nth-child(3) .card-icon { --bounce-delay: 0.4s; }
	.card:nth-child(4) .card-icon { --bounce-delay: 0.6s; }
	.card:nth-child(5) .card-icon { --bounce-delay: 0.8s; }

	.card-title {
		font-size: 1.8rem;
		color: #333;
		margin-bottom: 0.5rem;
		letter-spacing: 2px;
	}

	.card-description {
		font-size: 1.2rem;
		color: #666;
		font-weight: 400;
		margin-bottom: 1rem;
	}

	.card-arrow {
		position: absolute;
		bottom: 1.5rem;
		right: 1.5rem;
		font-size: 1.5rem;
		color: var(--theme-color);
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.3s ease;
	}

	.card:hover .card-arrow {
		opacity: 1;
		transform: translateX(0);
	}

	.footer {
		margin-top: auto;
		padding: 2rem;
		text-align: center;
	}

	.status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
		color: #666;
		justify-content: center;
	}

	.status-dot {
		width: 10px;
		height: 10px;
		background: #4caf50;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	@keyframes glow {
		0%, 100% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(1.2);
		}
	}

	@keyframes bounce {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
		}
	}

	@media (max-width: 768px) {
		.name {
			font-size: 3rem;
		}
		
		.card {
			flex: 1 1 100%;
			max-width: 100%;
		}
		
		.tagline {
			gap: 1rem;
		}
		
		.tag {
			font-size: 1rem;
			padding: 0.4rem 0.8rem;
		}
	}
</style>