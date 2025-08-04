<script lang="ts">
	import { onMount } from 'svelte';
	
	let ready = false;
	let formData = {
		name: '',
		email: '',
		message: ''
	};
	let hoveredSocial: string | null = null;
	
	onMount(() => {
		ready = true;
	});
	
	const profiles = {
		linkedin: {
			username: 'prateekrathod',
			url: 'https://www.linkedin.com/in/prateekrathod/',
			icon: '💼',
			label: 'LinkedIn'
		},
		twitter: {
			username: 'praaaateeeek',
			url: 'https://twitter.com/praaaateeeek',
			icon: '🐦',
			label: 'Twitter / X'
		},
		github: {
			username: 'lawRathod',
			url: 'https://github.com/lawRathod',
			icon: '💻',
			label: 'GitHub'
		}
	};
	
	function handleSubmit() {
		// Handle form submission
		alert(`Thanks for reaching out, ${formData.name}! I'll get back to you soon.`);
		formData = { name: '', email: '', message: '' };
	}
</script>

<svelte:head>
	<title>Contact - Prateek Rathod</title>
</svelte:head>

<div class="container" class:ready>
	<header class="hero">
		<h1 class="title">Let's Connect!</h1>
		<p class="subtitle">I'm always excited to work on interesting projects</p>
	</header>

	<div class="content">
		<section class="contact-form">
			<h2 class="section-title">Send me a message</h2>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="form-group">
					<label for="name">Name</label>
					<input 
						type="text" 
						id="name" 
						bind:value={formData.name}
						placeholder="Your name"
						required
					/>
				</div>
				
				<div class="form-group">
					<label for="email">Email</label>
					<input 
						type="email" 
						id="email" 
						bind:value={formData.email}
						placeholder="your@email.com"
						required
					/>
				</div>
				
				<div class="form-group">
					<label for="message">Message</label>
					<textarea 
						id="message" 
						bind:value={formData.message}
						placeholder="Tell me about your project..."
						rows="5"
						required
					></textarea>
				</div>
				
				<button type="submit" class="submit-btn">
					Send Message
					<span class="btn-arrow">→</span>
				</button>
			</form>
		</section>

		<section class="social-section">
			<h2 class="section-title">Find me online</h2>
			<div class="social-links">
				{#each Object.entries(profiles) as [key, profile], i}
					<a 
						href={profile.url} 
						target="_blank"
						rel="noopener noreferrer"
						class="social-card"
						class:hovered={hoveredSocial === key}
						on:mouseenter={() => hoveredSocial = key}
						on:mouseleave={() => hoveredSocial = null}
						style="animation-delay: {i * 0.1}s"
					>
						<span class="social-icon">{profile.icon}</span>
						<div class="social-info">
							<h3 class="social-label">{profile.label}</h3>
							<p class="social-username">@{profile.username}</p>
						</div>
						<span class="social-arrow">↗</span>
					</a>
				{/each}
			</div>
			
			<div class="coffee-section">
				<a 
					href="https://buymeacoffee.com/noodleweb" 
					target="_blank"
					rel="noopener noreferrer"
					class="coffee-link"
				>
					<span class="coffee-icon">☕</span>
					<span>Buy me a coffee?</span>
				</a>
			</div>
		</section>
	</div>
</div>

<style>
	.container {
		min-height: 100vh;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		opacity: 0;
		transition: opacity 0.5s ease-in;
	}
	
	.container.ready {
		opacity: 1;
	}

	.hero {
		text-align: center;
		margin-bottom: 4rem;
		animation: slideDown 0.8s ease-out;
	}

	.title {
		font-size: 3.5rem;
		background: linear-gradient(135deg, var(--theme-color), #00d4ff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
		animation: glow 3s ease-in-out infinite;
	}

	.subtitle {
		font-size: 1.5rem;
		color: #666;
		font-weight: 400;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.section-title {
		font-size: 2rem;
		margin-bottom: 2rem;
		position: relative;
		padding-bottom: 1rem;
	}

	.section-title::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 60px;
		height: 4px;
		background: var(--theme-color);
		border-radius: 2px;
	}

	.contact-form {
		animation: fadeInLeft 0.8s ease-out;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		font-size: 1.3rem;
		margin-bottom: 0.5rem;
		color: #333;
		font-weight: 500;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 1rem;
		font-size: 1.2rem;
		border: 3px solid #f0f0f0;
		border-radius: 0.5rem;
		font-family: inherit;
		transition: all 0.3s ease;
		background: #fff;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--theme-color);
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(3, 169, 244, 0.2);
	}

	.submit-btn {
		background: var(--theme-color);
		color: white;
		border: none;
		padding: 1rem 2rem;
		font-size: 1.3rem;
		font-weight: 600;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: inherit;
	}

	.submit-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 25px rgba(3, 169, 244, 0.3);
		background: #0288d1;
	}

	.btn-arrow {
		transition: transform 0.3s ease;
	}

	.submit-btn:hover .btn-arrow {
		transform: translateX(5px);
	}

	.social-section {
		animation: fadeInRight 0.8s ease-out;
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	.social-card {
		display: flex;
		align-items: center;
		padding: 1.5rem;
		background: #fff;
		border: 3px solid #f0f0f0;
		border-radius: 1rem;
		transition: all 0.3s ease;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		animation: fadeIn 0.6s ease-out forwards;
		opacity: 0;
	}

	.social-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 5px;
		height: 100%;
		background: linear-gradient(180deg, var(--theme-color), #00d4ff);
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 0.3s ease;
	}

	.social-card:hover {
		transform: translateX(10px);
		border-color: var(--theme-color);
		box-shadow: 0 10px 30px rgba(3, 169, 244, 0.2);
	}

	.social-card:hover::before {
		transform: scaleY(1);
	}

	.social-icon {
		font-size: 2.5rem;
		margin-right: 1rem;
		animation: bounce 2s ease-in-out infinite;
	}

	.social-info {
		flex: 1;
	}

	.social-label {
		font-size: 1.5rem;
		color: #333;
		margin: 0;
	}

	.social-username {
		font-size: 1.2rem;
		color: #666;
		margin: 0;
		font-weight: 400;
	}

	.social-arrow {
		font-size: 1.5rem;
		color: var(--theme-color);
		opacity: 0;
		transform: translate(-10px, -10px);
		transition: all 0.3s ease;
	}

	.social-card:hover .social-arrow {
		opacity: 1;
		transform: translate(0, 0);
	}

	.coffee-section {
		text-align: center;
		padding: 2rem;
		background: rgba(3, 169, 244, 0.05);
		border-radius: 1rem;
		animation: fadeIn 1s ease-out;
	}

	.coffee-link {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		font-size: 1.5rem;
		color: var(--theme-color);
		text-decoration: none;
		padding: 1rem 2rem;
		border: 2px solid var(--theme-color);
		border-radius: 2rem;
		transition: all 0.3s ease;
	}

	.coffee-link:hover {
		background: var(--theme-color);
		color: white;
		transform: translateY(-3px);
		box-shadow: 0 10px 25px rgba(3, 169, 244, 0.3);
	}

	.coffee-icon {
		font-size: 2rem;
		animation: wiggle 2s ease-in-out infinite;
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

	@keyframes fadeInLeft {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes fadeInRight {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
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

	@keyframes wiggle {
		0%, 100% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(-10deg);
		}
		75% {
			transform: rotate(10deg);
		}
	}

	@media (max-width: 768px) {
		.content {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
		
		.title {
			font-size: 2.5rem;
		}
		
		.social-card {
			padding: 1rem;
		}
		
		.social-icon {
			font-size: 2rem;
		}
	}
</style>