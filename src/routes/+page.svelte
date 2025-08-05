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
		<div class="hero-content">
			<div class="intro-badge">
				<span class="availability-dot"></span>
				Available for new opportunities
			</div>
			<h1 class="title">
				<span class="greeting">Hello, I'm</span>
				<span class="name">Prateek Rathod</span>
			</h1>
			<p class="subtitle">Software Engineer & Digital Craftsman</p>
			<p class="description">I build exceptional digital experiences that merge innovative technology with thoughtful design, creating solutions that make a meaningful impact.</p>
			<div class="expertise">
				<span class="expertise-item">
					<span class="expertise-icon">⚡</span>
					<span class="expertise-text">Full-Stack Development</span>
				</span>
				<span class="expertise-item">
					<span class="expertise-icon">🎨</span>
					<span class="expertise-text">UI/UX Design</span>
				</span>
				<span class="expertise-item">
					<span class="expertise-icon">🔧</span>
					<span class="expertise-text">System Architecture</span>
				</span>
			</div>
		</div>
	</header>

	<!-- Featured Work Section -->
	<section class="featured-work">
		<div class="section-header">
			<h2 class="section-title">Featured Work</h2>
			<p class="section-subtitle">Recent projects and achievements</p>
		</div>
		<div class="featured-grid">
			<div class="featured-item large">
				<div class="featured-image">
					<div class="project-preview">
						<div class="preview-header">
							<div class="preview-dots">
								<span></span><span></span><span></span>
							</div>
						</div>
						<div class="preview-content">
							<div class="code-lines">
								<div class="line">const portfolio = &#123;</div>
								<div class="line">  design: 'modern',</div>
								<div class="line">  tech: &#91;'SvelteKit', 'TypeScript'&#93;</div>
								<div class="line">&#125;</div>
							</div>
						</div>
					</div>
				</div>
				<div class="featured-content">
					<div class="featured-tag">Latest</div>
					<h3 class="featured-title">Personal Portfolio Website</h3>
					<p class="featured-description">A modern, responsive portfolio built with SvelteKit featuring dark mode, smooth animations, and a professional design system.</p>
					<div class="featured-tech">
						<span class="tech-tag">SvelteKit</span>
						<span class="tech-tag">TypeScript</span>
						<span class="tech-tag">CSS3</span>
					</div>
				</div>
			</div>
			<div class="featured-item">
				<div class="featured-content">
					<div class="featured-icon">🎮</div>
					<h3 class="featured-title">Interactive Games</h3>
					<p class="featured-description">Collection of browser-based games built with modern web technologies.</p>
					<a href="/games" class="featured-link">Explore Games →</a>
				</div>
			</div>
			<div class="featured-item">
				<div class="featured-content">
					<div class="featured-icon">🛠️</div>
					<h3 class="featured-title">Developer Tools</h3>
					<p class="featured-description">Utility tools and applications to enhance developer productivity.</p>
					<a href="/tools" class="featured-link">View Tools →</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section class="skills">
		<div class="section-header">
			<h2 class="section-title">Technologies & Skills</h2>
			<p class="section-subtitle">Tools and technologies I work with</p>
		</div>
		<div class="skills-grid">
			<div class="skill-category">
				<h3 class="category-title">Frontend</h3>
				<div class="skill-tags">
					<span class="skill-tag">React</span>
					<span class="skill-tag">Svelte</span>
					<span class="skill-tag">Vue.js</span>
					<span class="skill-tag">TypeScript</span>
					<span class="skill-tag">Tailwind CSS</span>
				</div>
			</div>
			<div class="skill-category">
				<h3 class="category-title">Backend</h3>
				<div class="skill-tags">
					<span class="skill-tag">Node.js</span>
					<span class="skill-tag">Python</span>
					<span class="skill-tag">PostgreSQL</span>
					<span class="skill-tag">MongoDB</span>
					<span class="skill-tag">Redis</span>
				</div>
			</div>
			<div class="skill-category">
				<h3 class="category-title">Tools & DevOps</h3>
				<div class="skill-tags">
					<span class="skill-tag">Docker</span>
					<span class="skill-tag">AWS</span>
					<span class="skill-tag">Git</span>
					<span class="skill-tag">CI/CD</span>
					<span class="skill-tag">Linux</span>
				</div>
			</div>
		</div>
	</section>

	<!-- What I Do Section -->
	<section class="explore">
		<div class="section-header">
			<h2 class="section-title">What I Do</h2>
			<p class="section-subtitle">Explore my work across different domains</p>
		</div>
		<div class="cards-grid">
			{#each pages as page, i}
				<a 
					href={`/${page}`} 
					class="card"
					class:hovered={hoveredIndex === i}
					on:mouseenter={() => handleMouseEnter(i)}
					on:mouseleave={handleMouseLeave}
					style="animation-delay: {i * 0.1}s"
				>
					<div class="card-header">
						<div class="card-icon">{pageDetails[page].icon}</div>
						<div class="card-arrow">→</div>
					</div>
					<div class="card-content">
						<h3 class="card-title">{page.charAt(0).toUpperCase() + page.slice(1)}</h3>
						<p class="card-description">{pageDetails[page].description}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Contact CTA Section -->
	<section class="contact-cta">
		<div class="cta-content">
			<h2 class="cta-title">Let's Build Something Amazing</h2>
			<p class="cta-description">Ready to bring your ideas to life? I'm always excited to work on innovative projects that make a difference.</p>
			<div class="cta-actions">
				<a href="/contact" class="cta-button primary">Get In Touch</a>
				<a href="/projects" class="cta-button secondary">View My Work</a>
			</div>
			<div class="social-links">
				<a href="https://github.com" class="social-link" aria-label="GitHub">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
				</a>
				<a href="https://linkedin.com" class="social-link" aria-label="LinkedIn">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				</a>
				<a href="https://twitter.com" class="social-link" aria-label="Twitter">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
					</svg>
				</a>
			</div>
		</div>
	</section>

	<footer class="footer">
		<div class="footer-content">
			<p class="status">
				<span class="status-dot"></span>
				Available for exciting projects
			</p>
			<p class="footer-text">Let's build something amazing together</p>
		</div>
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
		transition: opacity 0.8s ease-in;
		max-width: 1400px;
		margin: 0 auto;
		position: relative;
	}

	.container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
						  radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
		pointer-events: none;
		z-index: -1;
	}
	
	.container.ready {
		opacity: 1;
	}

	.hero {
		text-align: center;
		margin: 4rem 0 6rem;
		animation: slideDown 0.8s ease-out;
		max-width: 800px;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.intro-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #059669;
		letter-spacing: 0.025em;
	}

	.availability-dot {
		width: 8px;
		height: 8px;
		background: #22c55e;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	.title {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 0;
	}

	.greeting {
		font-size: 1.5rem;
		color: var(--text-secondary);
		font-weight: 400;
		letter-spacing: 0.025em;
	}

	.name {
		font-size: 3.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, var(--theme-color), #6366f1, #8b5cf6);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.1;
		letter-spacing: -0.025em;
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--text-primary);
		font-weight: 600;
		margin: 0;
		letter-spacing: 0.025em;
	}

	.description {
		font-size: 1.125rem;
		color: var(--text-secondary);
		font-weight: 400;
		line-height: 1.6;
		max-width: 600px;
		margin: 0;
		letter-spacing: 0.015em;
	}

	.expertise {
		display: flex;
		gap: 2rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.expertise-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: 0.75rem;
		transition: all 0.3s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.expertise-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		border-color: var(--theme-color);
	}

	.expertise-icon {
		font-size: 1.25rem;
	}

	.expertise-text {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-primary);
		letter-spacing: 0.025em;
	}

	/* Featured Work Section */
	.featured-work {
		width: 100%;
		margin-bottom: 6rem;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.featured-item {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		padding: 2rem;
		transition: all 0.3s ease;
		animation: fadeIn 0.6s ease-out forwards;
		opacity: 0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
	}

	.featured-item:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		border-color: rgba(99, 102, 241, 0.3);
	}

	.featured-item.large {
		grid-row: 1 / 3;
	}

	.featured-image {
		margin-bottom: 1.5rem;
		border-radius: 0.75rem;
		overflow: hidden;
		background: #f8fafc;
		border: 1px solid var(--border-color);
	}

	.project-preview {
		padding: 1rem;
		background: #1e293b;
		border-radius: 0.5rem;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	}

	.preview-header {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #334155;
	}

	.preview-dots {
		display: flex;
		gap: 0.5rem;
	}

	.preview-dots span {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #64748b;
	}

	.preview-dots span:first-child { background: #ef4444; }
	.preview-dots span:nth-child(2) { background: #f59e0b; }
	.preview-dots span:nth-child(3) { background: #10b981; }

	.code-lines {
		color: #e2e8f0;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.line {
		margin-bottom: 0.25rem;
	}

	.featured-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.featured-tag {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.75rem;
		background: rgba(34, 197, 94, 0.1);
		color: #059669;
		border-radius: 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
		width: fit-content;
	}

	.featured-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.featured-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 1rem 0;
		letter-spacing: -0.025em;
	}

	.featured-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0 0 1.5rem 0;
		flex: 1;
	}

	.featured-tech {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tech-tag {
		padding: 0.25rem 0.75rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	.featured-link {
		color: var(--theme-color);
		font-weight: 500;
		font-size: 0.875rem;
		text-decoration: none;
		transition: all 0.2s ease;
		margin-top: auto;
	}

	.featured-link:hover {
		color: var(--text-primary);
	}

	/* Skills Section */
	.skills {
		width: 100%;
		margin-bottom: 6rem;
		padding: 3rem 2rem;
		background: var(--bg-secondary);
		border-radius: 1.5rem;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.skill-category {
		text-align: center;
	}

	.category-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 1.5rem 0;
		letter-spacing: -0.025em;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
	}

	.skill-tag {
		padding: 0.5rem 1rem;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: 2rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-primary);
		transition: all 0.2s ease;
		cursor: default;
	}

	.skill-tag:hover {
		background: var(--theme-color);
		color: white;
		border-color: var(--theme-color);
		transform: translateY(-2px);
	}

	/* What I Do Section */
	.explore {
		width: 100%;
		margin-bottom: 6rem;
	}

	/* Contact CTA Section */
	.contact-cta {
		width: 100%;
		margin-bottom: 4rem;
		padding: 4rem 2rem;
		background: linear-gradient(135deg, var(--theme-color) 0%, #6366f1 100%);
		border-radius: 1.5rem;
		text-align: center;
		color: white;
		position: relative;
		overflow: hidden;
	}

	.contact-cta::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
		pointer-events: none;
	}

	.cta-content {
		position: relative;
		z-index: 1;
		max-width: 600px;
		margin: 0 auto;
	}

	.cta-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 0 1rem 0;
		letter-spacing: -0.025em;
	}

	.cta-description {
		font-size: 1.125rem;
		opacity: 0.9;
		line-height: 1.6;
		margin: 0 0 2rem 0;
	}

	.cta-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.cta-button {
		padding: 0.75rem 1.5rem;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 1rem;
		text-decoration: none;
		transition: all 0.2s ease;
		border: 2px solid transparent;
	}

	.cta-button.primary {
		background: white;
		color: var(--theme-color);
	}

	.cta-button.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
	}

	.cta-button.secondary {
		background: transparent;
		color: white;
		border-color: rgba(255, 255, 255, 0.3);
	}

	.cta-button.secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: white;
	}

	.social-links {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.social-link {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.social-link:hover {
		background: white;
		color: var(--theme-color);
		transform: translateY(-2px);
	}

	.section-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 1rem 0;
		letter-spacing: -0.025em;
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		font-weight: 400;
		margin: 0;
		letter-spacing: 0.015em;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.card {
		position: relative;
		padding: 2rem;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: 1rem;
		transition: all 0.3s ease;
		cursor: pointer;
		overflow: hidden;
		animation: fadeIn 0.6s ease-out forwards;
		opacity: 0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--theme-color), #6366f1);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		border-color: rgba(99, 102, 241, 0.3);
	}

	.card:hover::before {
		transform: scaleX(1);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.card-icon {
		font-size: 2.5rem;
		transition: transform 0.3s ease;
	}

	.card:hover .card-icon {
		transform: scale(1.1);
	}

	.card-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 0.75rem 0;
		letter-spacing: 0.025em;
	}

	.card-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 400;
		line-height: 1.5;
		margin: 0;
		letter-spacing: 0.015em;
	}

	.card-arrow {
		font-size: 1.25rem;
		color: var(--text-secondary);
		opacity: 0.5;
		transition: all 0.3s ease;
	}

	.card:hover .card-arrow {
		opacity: 1;
		color: var(--theme-color);
		transform: translateX(4px);
	}

	.footer {
		margin-top: 2rem;
		padding: 2rem;
		text-align: center;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border-color);
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #059669;
		justify-content: center;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background: #22c55e;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	.footer-text {
		font-size: 1rem;
		color: var(--text-secondary);
		margin: 0;
		letter-spacing: 0.015em;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
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

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
		}
		70% {
			box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
		}
	}

	@media (max-width: 1024px) {
		.featured-grid {
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}

		.featured-item.large {
			grid-row: auto;
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.hero {
			margin: 2rem 0 4rem;
		}

		.name {
			font-size: 2.5rem;
		}

		.greeting {
			font-size: 1.25rem;
		}

		.subtitle {
			font-size: 1.125rem;
		}

		.description {
			font-size: 1rem;
		}

		.expertise {
			gap: 1rem;
			flex-direction: column;
			align-items: center;
		}

		.expertise-item {
			padding: 0.5rem 1rem;
		}

		.expertise-text {
			font-size: 0.8rem;
		}

		.section-title {
			font-size: 2rem;
		}

		.featured-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.featured-item {
			padding: 1.5rem;
		}

		.featured-item.large {
			grid-row: auto;
			grid-column: auto;
		}

		.skills {
			padding: 2rem 1rem;
			margin-bottom: 4rem;
		}

		.skills-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.cards-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.card {
			padding: 1.5rem;
		}

		.contact-cta {
			padding: 3rem 1.5rem;
			margin-bottom: 3rem;
		}

		.cta-title {
			font-size: 2rem;
		}

		.cta-actions {
			flex-direction: column;
			align-items: center;
		}

		.cta-button {
			width: 100%;
			max-width: 250px;
		}
	}

	@media (max-width: 480px) {
		.name {
			font-size: 2rem;
		}

		.section-title {
			font-size: 1.75rem;
		}

		.expertise {
			flex-direction: column;
		}

		.featured-item {
			padding: 1rem;
		}

		.skills {
			padding: 1.5rem 1rem;
		}

		.contact-cta {
			padding: 2rem 1rem;
		}

		.cta-title {
			font-size: 1.75rem;
		}

		.cta-description {
			font-size: 1rem;
		}
	}
</style>