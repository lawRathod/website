<script lang="ts">
	const games = [
		{
			id: 'flappy-bird',
			title: 'Flappy Bird',
			emoji: '🐦',
			description: 'Navigate through pipes and set a high score!',
			path: '/games/flappy-bird',
			status: 'available',
			difficulty: 'Medium',
			tags: ['Arcade', 'Skill', 'Classic']
		}
		// More games can be added here in the future
	];
</script>

<svelte:head>
	<title>Games Collection | Prateek Rathod</title>
</svelte:head>

<div class="games-container">
	<div class="games-header">
		<h1>🎮 Games Collection</h1>
		<p>Fun interactive experiences to enjoy!</p>
	</div>
	
	<div class="games-grid">
		{#each games as game}
			<div class="game-card">
				<div class="game-preview">
					<div class="game-emoji">{game.emoji}</div>
					<div class="game-status status-{game.status}">
						{game.status === 'available' ? '✅ Ready' : '🚧 Coming Soon'}
					</div>
				</div>
				
				<div class="game-info">
					<h2 class="game-title">{game.title}</h2>
					<p class="game-description">{game.description}</p>
					
					<div class="game-meta">
						<span class="difficulty">🎯 {game.difficulty}</span>
						<div class="tags">
							{#each game.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
					</div>
				</div>
				
				<div class="game-actions">
					{#if game.status === 'available'}
						<a href={game.path} class="play-button">
							<span class="play-icon">🎮</span>
							Play Now
						</a>
					{:else}
						<button class="play-button disabled" disabled>
							<span class="play-icon">⏳</span>
							Coming Soon
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	
	<div class="coming-soon">
		<h3>🚀 More Games Coming Soon!</h3>
		<p>I'm working on adding more exciting games to the collection. Stay tuned!</p>
	</div>
</div>

<style>
	.games-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 80vh;
	}
	
	.games-header {
		text-align: center;
		margin-bottom: 4rem;
	}
	
	.games-header h1 {
		font-size: 3.5rem;
		color: var(--text-primary);
		margin-bottom: 1rem;
		background: linear-gradient(45deg, var(--theme-color), #ff6b6b, #4ecdc4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.games-header p {
		font-size: 1.6rem;
		color: var(--text-secondary);
	}
	
	.games-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}
	
	.game-card {
		background: var(--bg-card);
		border-radius: 20px;
		padding: 2rem;
		box-shadow: 0 10px 30px var(--shadow-color);
		border: 2px solid var(--border-color);
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}
	
	.game-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--theme-color), transparent);
		transition: left 0.5s;
	}
	
	.game-card:hover::before {
		left: 100%;
	}
	
	.game-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 20px 50px var(--shadow-color);
		border-color: var(--theme-color);
	}
	
	.game-preview {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}
	
	.game-emoji {
		font-size: 4rem;
		animation: bounce 2s infinite;
	}
	
	.game-status {
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 600;
	}
	
	.status-available {
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
		border: 1px solid rgba(34, 197, 94, 0.3);
	}
	
	.status-coming-soon {
		background: rgba(251, 191, 36, 0.2);
		color: #fbbf24;
		border: 1px solid rgba(251, 191, 36, 0.3);
	}
	
	.game-info {
		flex: 1;
		margin-bottom: 2rem;
	}
	
	.game-title {
		font-size: 2rem;
		color: var(--text-primary);
		margin-bottom: 1rem;
		font-weight: bold;
	}
	
	.game-description {
		font-size: 1.2rem;
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}
	
	.game-meta {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.difficulty {
		font-size: 1rem;
		color: var(--text-primary);
		font-weight: 600;
	}
	
	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	
	.tag {
		background: var(--bg-secondary);
		color: var(--text-secondary);
		padding: 0.4rem 0.8rem;
		border-radius: 12px;
		font-size: 0.9rem;
		border: 1px solid var(--border-color);
	}
	
	.game-actions {
		margin-top: auto;
	}
	
	.play-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		width: 100%;
		padding: 1rem 2rem;
		background: var(--theme-color);
		color: white;
		text-decoration: none;
		border-radius: 15px;
		font-size: 1.2rem;
		font-weight: 600;
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
		box-shadow: 0 4px 15px var(--shadow-color);
	}
	
	.play-button:hover:not(.disabled) {
		background: var(--theme-color-dark);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px var(--shadow-color);
	}
	
	.play-button.disabled {
		background: var(--bg-secondary);
		color: var(--text-secondary);
		cursor: not-allowed;
		box-shadow: none;
	}
	
	.play-icon {
		font-size: 1.3rem;
	}
	
	.coming-soon {
		text-align: center;
		padding: 3rem 2rem;
		background: var(--bg-card);
		border-radius: 20px;
		border: 2px dashed var(--border-color);
	}
	
	.coming-soon h3 {
		font-size: 2rem;
		color: var(--text-primary);
		margin-bottom: 1rem;
	}
	
	.coming-soon p {
		font-size: 1.3rem;
		color: var(--text-secondary);
	}
	
	@keyframes bounce {
		0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
		40%, 43% { transform: translateY(-8px); }
		70% { transform: translateY(-4px); }
		90% { transform: translateY(-2px); }
	}
	
	@media (max-width: 768px) {
		.games-container {
			padding: 1rem;
		}
		
		.games-header h1 {
			font-size: 2.5rem;
		}
		
		.games-header p {
			font-size: 1.3rem;
		}
		
		.games-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.game-card {
			padding: 1.5rem;
		}
		
		.game-title {
			font-size: 1.8rem;
		}
		
		.game-description {
			font-size: 1.1rem;
		}
		
		.play-button {
			font-size: 1.1rem;
			padding: 0.8rem 1.5rem;
		}
	}
	
	@media (max-width: 480px) {
		.games-header h1 {
			font-size: 2rem;
		}
		
		.game-emoji {
			font-size: 3rem;
		}
		
		.game-title {
			font-size: 1.6rem;
		}
		
		.game-meta {
			gap: 0.8rem;
		}
		
		.coming-soon {
			padding: 2rem 1rem;
		}
		
		.coming-soon h3 {
			font-size: 1.6rem;
		}
		
		.coming-soon p {
			font-size: 1.1rem;
		}
	}
</style>