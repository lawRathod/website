<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let route = '';
	let mobileMenuOpen = false;
	
	const navigation = [
		{ name: 'Games', href: '/games', icon: '🎮' },
		{ name: 'Tools', href: '/tools', icon: '🛠️' },
		{ name: 'Blogs', href: '/blogs', icon: '📝' },
		{ name: 'Projects', href: '/projects', icon: '🚀' },
		{ name: 'Contact', href: '/contact', icon: '💬' }
	];
	
	const storeUpdated = () => {
		route = page.url.pathname;
		mobileMenuOpen = false; // Close mobile menu on navigation
	};

	afterNavigate(storeUpdated);
	
	onMount(() => {
		theme.init();
	});
	
	function toggleTheme() {
		theme.toggle();
	}
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- Progress bar -->
<div class="progress-bar"></div>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<!-- Logo -->
		<div class="nav-brand">
			<a href="/" class="brand-link">
				<div class="brand-icon">PR</div>
				<div class="brand-text">
					<span class="brand-name">Prateek Rathod</span>
					{#if route && route !== '/'}
						<span class="brand-route">/ {route.replace('/', '')}</span>
					{/if}
				</div>
			</a>
		</div>

		<!-- Desktop Navigation -->
		<div class="nav-desktop">
			<div class="nav-links">
				{#each navigation as item}
					<a 
						href={item.href} 
						class="nav-link" 
						class:active={route === item.href}
					>
						<span class="nav-text">{item.name}</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Right side controls -->
		<div class="nav-actions">
			<button 
				class="theme-toggle" 
				on:click={toggleTheme}
				aria-label="Toggle theme"
			>
				{#if $theme === 'light'}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
					</svg>
				{:else}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="5"></circle>
						<path d="m12 1 0 2m0 18 0 2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12l2 0m18 0 2 0M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
					</svg>
				{/if}
			</button>

			<!-- Mobile menu button -->
			<button 
				class="mobile-menu-button" 
				on:click={toggleMobileMenu}
				aria-label="Toggle menu"
				class:open={mobileMenuOpen}
			>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</button>
		</div>
	</div>
</nav>

<!-- Mobile drawer -->
{#if mobileMenuOpen}
	<div class="mobile-overlay" on:click={closeMobileMenu} role="button" tabindex="-1"></div>
{/if}

<div class="mobile-drawer" class:open={mobileMenuOpen}>
	<div class="drawer-header">
		<div class="drawer-brand">
			<div class="brand-icon">PR</div>
			<span class="brand-name">Prateek Rathod</span>
		</div>
		<button class="drawer-close" on:click={closeMobileMenu} aria-label="Close menu">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="m18 6-12 12M6 6l12 12"></path>
			</svg>
		</button>
	</div>
	
	<nav class="drawer-nav">
		{#each navigation as item, index}
			<a 
				href={item.href} 
				class="drawer-link" 
				class:active={route === item.href}
				style="animation-delay: {(index + 1) * 0.1}s"
				on:click={closeMobileMenu}
			>
				<span class="drawer-icon">{item.icon}</span>
				<span class="drawer-text">{item.name}</span>
				<svg class="drawer-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="m9 18 6-6-6-6"></path>
				</svg>
			</a>
		{/each}
	</nav>
	
	<div class="drawer-footer">
		<div class="drawer-status">
			<span class="status-dot"></span>
			<span class="status-text">Available for projects</span>
		</div>
	</div>
</div>

<slot />

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, var(--theme-color), #6366f1, #8b5cf6);
		z-index: 1000;
		box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
	}
	
	.navbar {
		position: sticky;
		top: 3px;
		z-index: 100;
		width: 100%;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-color);
		transition: all 0.3s ease;
	}

	[data-theme="dark"] .navbar {
		background: rgba(10, 10, 10, 0.8);
	}
	
	.nav-container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		height: 80px;
	}
	
	.nav-brand {
		display: flex;
		align-items: center;
	}
	
	.brand-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		text-decoration: none;
		transition: all 0.3s ease;
	}
	
	.brand-icon {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, var(--theme-color), #6366f1);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		font-weight: 700;
		font-size: 0.875rem;
		letter-spacing: -0.025em;
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
	}
	
	.brand-text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}
	
	.brand-name {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1;
		letter-spacing: -0.025em;
	}
	
	.brand-route {
		font-size: 0.75rem;
		color: var(--text-secondary);
		text-transform: capitalize;
		letter-spacing: 0.025em;
	}
	
	.nav-desktop {
		display: flex;
		align-items: center;
	}
	
	.nav-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	.nav-link {
		display: flex;
		align-items: center;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		text-decoration: none;
		color: var(--text-secondary);
		transition: all 0.2s ease;
		font-size: 0.875rem;
		font-weight: 500;
		position: relative;
		letter-spacing: 0.025em;
	}
	
	.nav-link:hover {
		color: var(--text-primary);
		background: var(--bg-secondary);
	}
	
	.nav-link.active {
		color: white;
		background: var(--theme-color);
		box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
	}
	
	.nav-text {
		font-size: 0.875rem;
		letter-spacing: 0.025em;
	}
	
	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.theme-toggle {
		width: 40px;
		height: 40px;
		border: 1px solid var(--border-color);
		background: var(--bg-card);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--text-secondary);
	}
	
	.theme-toggle:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
		border-color: var(--theme-color);
	}
	
	.mobile-menu-button {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border: 1px solid var(--border-color);
		background: var(--bg-card);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		gap: 4px;
	}
	
	.mobile-menu-button:hover {
		background: var(--bg-secondary);
		border-color: var(--theme-color);
	}
	
	.hamburger-line {
		width: 18px;
		height: 2px;
		background: var(--text-secondary);
		transition: all 0.3s ease;
		border-radius: 1px;
	}
	
	.mobile-menu-button.open .hamburger-line:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}
	
	.mobile-menu-button.open .hamburger-line:nth-child(2) {
		opacity: 0;
	}
	
	.mobile-menu-button.open .hamburger-line:nth-child(3) {
		transform: rotate(-45deg) translate(7px, -6px);
	}
	
	/* Mobile drawer styles */
	.mobile-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 199;
		animation: fadeIn 0.3s ease;
	}
	
	.mobile-drawer {
		position: fixed;
		top: 0;
		right: -100%;
		width: 320px;
		height: 100%;
		background: var(--bg-card);
		border-left: 1px solid var(--border-color);
		z-index: 200;
		transition: right 0.3s ease;
		display: flex;
		flex-direction: column;
		box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
	}
	
	.mobile-drawer.open {
		right: 0;
	}
	
	.drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 1px solid var(--border-color);
	}
	
	.drawer-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	
	.drawer-close {
		width: 32px;
		height: 32px;
		border: 1px solid var(--border-color);
		background: var(--bg-secondary);
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--text-secondary);
	}
	
	.drawer-close:hover {
		background: var(--theme-color);
		color: white;
		border-color: var(--theme-color);
	}
	
	.drawer-nav {
		flex: 1;
		padding: 1rem 0;
		overflow-y: auto;
	}
	
	.drawer-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.5rem;
		text-decoration: none;
		color: var(--text-secondary);
		transition: all 0.2s ease;
		border-left: 3px solid transparent;
		animation: slideInRight 0.3s ease forwards;
		opacity: 0;
		transform: translateX(20px);
	}
	
	.drawer-link:hover {
		background: var(--bg-secondary);
		color: var(--text-primary);
		border-left-color: var(--theme-color);
	}
	
	.drawer-link.active {
		background: rgba(99, 102, 241, 0.1);
		color: var(--theme-color);
		border-left-color: var(--theme-color);
	}
	
	.drawer-icon {
		font-size: 1.25rem;
		width: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.drawer-text {
		flex: 1;
		font-size: 1rem;
		font-weight: 500;
		letter-spacing: 0.025em;
	}
	
	.drawer-arrow {
		opacity: 0.5;
		transition: all 0.2s ease;
	}
	
	.drawer-link:hover .drawer-arrow {
		opacity: 1;
		transform: translateX(2px);
	}
	
	.drawer-footer {
		padding: 1.5rem;
		border-top: 1px solid var(--border-color);
	}
	
	.drawer-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.status-dot {
		width: 8px;
		height: 8px;
		background: #22c55e;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}
	
	.status-text {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 500;
	}
	
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	
	@keyframes slideInRight {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	@keyframes pulse {
		0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
		70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
		100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
	}
	
	/* Responsive design */
	@media (max-width: 1024px) {
		.nav-desktop {
			display: none;
		}
		
		.mobile-menu-button {
			display: flex;
		}
	}
	
	@media (max-width: 768px) {
		.nav-container {
			padding: 1rem;
			height: 70px;
		}
		
		.brand-name {
			font-size: 1rem;
		}
		
		.brand-icon {
			width: 36px;
			height: 36px;
			font-size: 0.8rem;
		}
		
		.mobile-drawer {
			width: 280px;
		}
	}
	
	@media (max-width: 480px) {
		.brand-text {
			display: none;
		}
		
		.brand-icon {
			width: 32px;
			height: 32px;
			font-size: 0.75rem;
		}
		
		.mobile-drawer {
			width: 100%;
			right: -100%;
		}
		
		.mobile-drawer.open {
			right: 0;
		}
	}
	
	/* Smooth scrolling for the page */
	html {
		scroll-behavior: smooth;
		scroll-padding-top: 100px;
	}
</style>