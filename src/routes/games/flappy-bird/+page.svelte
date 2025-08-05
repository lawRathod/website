<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let gameState: 'menu' | 'countdown' | 'playing' | 'gameOver' = 'menu';
	let score = 0;
	let highScore = 0;
	let countdownTimer = 3;
	
	// Game objects
	let bird = {
		x: 80,
		y: 250,
		velocity: 0,
		radius: 20
	};
	
	let pipes: Array<{x: number, topHeight: number, bottomHeight: number, passed: boolean}> = [];
	let particles: Array<{x: number, y: number, vx: number, vy: number, life: number}> = [];
	
	// Game constants
	const GRAVITY = 0.5;
	const JUMP_FORCE = -10;
	const PIPE_WIDTH = 80;
	const PIPE_GAP = 200;
	const PIPE_SPEED = 3;
	
	let animationId: number;

	onMount(() => {
		if (typeof window !== 'undefined') {
			highScore = parseInt(localStorage.getItem('flappyBirdHighScore') || '0');
		}
		
		ctx = canvas.getContext('2d')!;
		canvas.width = 800;
		canvas.height = 500;
		
		// Event listeners
		canvas.addEventListener('click', handleInput);
		window.addEventListener('keydown', (e) => {
			if (e.code === 'Space') {
				e.preventDefault();
				handleInput();
			}
		});
		
		gameLoop();
		
		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	});
	
	function handleInput() {
		if (gameState === 'menu') {
			startCountdown();
		} else if (gameState === 'playing') {
			jump();
		} else if (gameState === 'gameOver') {
			resetGame();
		}
	}
	
	function startCountdown() {
		gameState = 'countdown';
		countdownTimer = 3;
		score = 0;
		bird = { x: 80, y: 200, velocity: 0, radius: 20 };
		pipes = [];
		particles = [];
		
		// Start countdown interval
		const countdownInterval = setInterval(() => {
			countdownTimer--;
			if (countdownTimer <= 0) {
				clearInterval(countdownInterval);
				startGame();
			}
		}, 1000);
	}
	
	function startGame() {
		gameState = 'playing';
		spawnPipe();
	}
	
	function resetGame() {
		gameState = 'menu';
	}
	
	function jump() {
		bird.velocity = JUMP_FORCE;
		// Add jump particles
		for (let i = 0; i < 8; i++) {
			particles.push({
				x: bird.x,
				y: bird.y + 10,
				vx: (Math.random() - 0.5) * 8,
				vy: Math.random() * 3 + 2,
				life: 20
			});
		}
	}
	
	function spawnPipe() {
		const topHeight = Math.random() * 200 + 50;
		const bottomHeight = canvas.height - topHeight - PIPE_GAP;
		
		pipes.push({
			x: canvas.width,
			topHeight,
			bottomHeight,
			passed: false
		});
	}
	
	function updateGame() {
		if (gameState !== 'playing') return;
		
		// Update bird
		bird.velocity += GRAVITY;
		bird.y += bird.velocity;
		
		// Update pipes
		pipes.forEach((pipe, index) => {
			pipe.x -= PIPE_SPEED;
			
			// Check scoring
			if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
				pipe.passed = true;
				score++;
				
				// Add score particles
				for (let i = 0; i < 12; i++) {
					particles.push({
						x: bird.x,
						y: bird.y,
						vx: (Math.random() - 0.5) * 12,
						vy: (Math.random() - 0.5) * 12,
						life: 30
					});
				}
			}
			
			// Remove off-screen pipes
			if (pipe.x + PIPE_WIDTH < 0) {
				pipes.splice(index, 1);
			}
		});
		
		// Spawn new pipes
		if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
			spawnPipe();
		}
		
		// Update particles
		particles.forEach((particle, index) => {
			particle.x += particle.vx;
			particle.y += particle.vy;
			particle.vy += 0.2;
			particle.life--;
			
			if (particle.life <= 0) {
				particles.splice(index, 1);
			}
		});
		
		// Check collisions
		checkCollisions();
	}
	
	function checkCollisions() {
		// Only check collisions during gameplay
		if (gameState !== 'playing') return;
		
		// Ground and ceiling collision
		if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
			gameOver();
			return;
		}
		
		// Pipe collision
		pipes.forEach(pipe => {
			if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + PIPE_WIDTH) {
				if (bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > canvas.height - pipe.bottomHeight) {
					gameOver();
				}
			}
		});
	}
	
	function gameOver() {
		gameState = 'gameOver';
		
		// Update high score
		if (score > highScore) {
			highScore = score;
			if (typeof window !== 'undefined') {
				localStorage.setItem('flappyBirdHighScore', highScore.toString());
			}
		}
		
		// Add explosion particles
		for (let i = 0; i < 25; i++) {
			particles.push({
				x: bird.x,
				y: bird.y,
				vx: (Math.random() - 0.5) * 15,
				vy: (Math.random() - 0.5) * 15,
				life: 60
			});
		}
	}
	
	function drawBackground() {
		// Sky gradient
		const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0, '#87CEEB');
		gradient.addColorStop(1, '#98FB98');
		
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		// Clouds
		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		const time = Date.now() * 0.0005;
		
		for (let i = 0; i < 5; i++) {
			const x = (i * 200 + time * 50) % (canvas.width + 100) - 50;
			const y = 50 + Math.sin(time + i) * 30;
			
			ctx.beginPath();
			ctx.arc(x, y, 30, 0, Math.PI * 2);
			ctx.arc(x + 40, y, 40, 0, Math.PI * 2);
			ctx.arc(x + 80, y, 30, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	
	function drawBird() {
		ctx.save();
		ctx.translate(bird.x, bird.y);
		
		// Rotation based on velocity
		const rotation = Math.min(Math.max(bird.velocity * 0.1, -0.5), 0.5);
		ctx.rotate(rotation);
		
		// Bird body
		ctx.fillStyle = '#FFD700';
		ctx.beginPath();
		ctx.arc(0, 0, bird.radius, 0, Math.PI * 2);
		ctx.fill();
		
		// Bird wing
		ctx.fillStyle = '#FFA500';
		ctx.beginPath();
		ctx.ellipse(-8, 0, 12, 8, 0, 0, Math.PI * 2);
		ctx.fill();
		
		// Bird eye
		ctx.fillStyle = '#000';
		ctx.beginPath();
		ctx.arc(8, -8, 4, 0, Math.PI * 2);
		ctx.fill();
		
		// Bird beak
		ctx.fillStyle = '#FF6B35';
		ctx.beginPath();
		ctx.moveTo(15, 0);
		ctx.lineTo(25, -3);
		ctx.lineTo(25, 3);
		ctx.closePath();
		ctx.fill();
		
		ctx.restore();
	}
	
	function drawPipes() {
		ctx.fillStyle = '#228B22';
		
		pipes.forEach(pipe => {
			// Top pipe
			ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
			
			// Bottom pipe
			ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, PIPE_WIDTH, pipe.bottomHeight);
			
			// Pipe caps
			ctx.fillStyle = '#32CD32';
			ctx.fillRect(pipe.x - 10, pipe.topHeight - 30, PIPE_WIDTH + 20, 30);
			ctx.fillRect(pipe.x - 10, canvas.height - pipe.bottomHeight, PIPE_WIDTH + 20, 30);
			ctx.fillStyle = '#228B22';
		});
	}
	
	function drawParticles() {
		particles.forEach(particle => {
			const alpha = particle.life / 30;
			ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
			ctx.fill();
		});
	}
	
	function drawUI() {
		// Score
		if (gameState === 'playing') {
			ctx.fillStyle = '#fff';
			ctx.font = 'bold 48px Arial';
			ctx.textAlign = 'center';
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 3;
			ctx.strokeText(score.toString(), canvas.width / 2, 80);
			ctx.fillText(score.toString(), canvas.width / 2, 80);
		}
		
		// Menu
		if (gameState === 'menu') {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			ctx.fillStyle = '#FFD700';
			ctx.font = 'bold 72px Arial';
			ctx.textAlign = 'center';
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 4;
			ctx.strokeText('🐦 FLAPPY BIRD', canvas.width / 2, 150);
			ctx.fillText('🐦 FLAPPY BIRD', canvas.width / 2, 150);
			
			ctx.fillStyle = '#fff';
			ctx.font = 'bold 32px Arial';
			ctx.fillText('Click or Press SPACE to Start', canvas.width / 2, 250);
			
			ctx.font = '24px Arial';
			ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, 320);
		}
		
		// Countdown
		if (gameState === 'countdown') {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			// Animated countdown number
			const time = Date.now() * 0.01;
			const scale = 1 + Math.sin(time) * 0.1;
			const glow = Math.sin(time * 2) * 0.5 + 0.5;
			
			ctx.save();
			ctx.translate(canvas.width / 2, canvas.height / 2);
			ctx.scale(scale, scale);
			
			// Glow effect
			ctx.shadowColor = `rgba(255, 215, 0, ${glow})`;
			ctx.shadowBlur = 30;
			
			// Countdown number
			ctx.fillStyle = '#FFD700';
			ctx.font = 'bold 120px Arial';
			ctx.textAlign = 'center';
			ctx.strokeStyle = '#FF6B35';
			ctx.lineWidth = 6;
			
			const displayText = countdownTimer > 0 ? countdownTimer.toString() : 'GO!';
			ctx.strokeText(displayText, 0, 20);
			ctx.fillText(displayText, 0, 20);
			
			ctx.restore();
			
			// Ready text
			ctx.fillStyle = '#fff';
			ctx.font = 'bold 28px Arial';
			ctx.textAlign = 'center';
			ctx.fillText('Get Ready!', canvas.width / 2, canvas.height / 2 + 80);
			
			// Add countdown particles occasionally
			if (Math.random() < 0.05) {
				for (let i = 0; i < 5; i++) {
					particles.push({
						x: canvas.width / 2 + (Math.random() - 0.5) * 200,
						y: canvas.height / 2 + (Math.random() - 0.5) * 200,
						vx: (Math.random() - 0.5) * 10,
						vy: (Math.random() - 0.5) * 10,
						life: 30
					});
				}
			}
		}
		
		// Game Over
		if (gameState === 'gameOver') {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			
			ctx.fillStyle = '#FF6B6B';
			ctx.font = 'bold 64px Arial';
			ctx.textAlign = 'center';
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 4;
			ctx.strokeText('GAME OVER', canvas.width / 2, 150);
			ctx.fillText('GAME OVER', canvas.width / 2, 150);
			
			ctx.fillStyle = '#fff';
			ctx.font = 'bold 36px Arial';
			ctx.fillText(`Score: ${score}`, canvas.width / 2, 220);
			
			ctx.font = '28px Arial';
			ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, 260);
			
			ctx.font = 'bold 24px Arial';
			ctx.fillText('Click or Press SPACE to Restart', canvas.width / 2, 320);
		}
	}
	
	function render() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		drawBackground();
		drawPipes();
		drawBird();
		drawParticles();
		drawUI();
	}
	
	function gameLoop() {
		updateGame();
		render();
		animationId = requestAnimationFrame(gameLoop);
	}
</script>

<svelte:head>
	<title>Flappy Bird | Prateek Rathod</title>
</svelte:head>

<div class="game-container">
	<div class="game-header">
		<div class="breadcrumb">
			<a href="/games">← Games</a>
			<span>Flappy Bird</span>
		</div>
		<h1>🐦 Flappy Bird</h1>
		<p>Navigate through pipes and set a high score!</p>
	</div>
	
	<div class="game-card">
		<div class="controls">
			<span class="control-item">🖱️ Click to jump</span>
			<span class="control-item">⌨️ Space to jump</span>
		</div>
		
		<div class="game-canvas-container">
			<canvas bind:this={canvas} class="game-canvas" class:playing={gameState === 'playing'}></canvas>
		</div>
	</div>
</div>

<style>
	.game-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 80vh;
	}
	
	.game-header {
		text-align: center;
		margin-bottom: 3rem;
	}
	
	.breadcrumb {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
		font-size: 1.2rem;
	}
	
	.breadcrumb a {
		color: var(--theme-color);
		text-decoration: none;
		transition: all 0.3s ease;
		padding: 0.5rem 1rem;
		border-radius: 8px;
	}
	
	.breadcrumb a:hover {
		background: var(--bg-card);
		transform: translateX(-2px);
	}
	
	.breadcrumb span {
		color: var(--text-secondary);
	}
	
	.game-header h1 {
		font-size: 3.5rem;
		color: var(--text-primary);
		margin-bottom: 1rem;
		background: linear-gradient(45deg, var(--theme-color), #ff6b6b, #4ecdc4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	.game-header p {
		font-size: 1.5rem;
		color: var(--text-secondary);
	}
	
	.game-card {
		background: var(--bg-card);
		border-radius: 20px;
		padding: 2rem;
		box-shadow: 0 10px 30px var(--shadow-color);
		border: 2px solid var(--border-color);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	
	.game-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 40px var(--shadow-color);
	}
	
	.controls {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 2rem;
	}
	
	.control-item {
		background: var(--theme-color);
		color: white;
		padding: 0.8rem 1.5rem;
		border-radius: 25px;
		font-size: 1.1rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		box-shadow: 0 4px 15px var(--shadow-color);
	}
	
	.game-canvas-container {
		display: flex;
		justify-content: center;
		background: linear-gradient(135deg, #87CEEB 0%, #98FB98 100%);
		border-radius: 15px;
		padding: 1.5rem;
		box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
	}
	
	.game-canvas {
		border-radius: 10px;
		cursor: pointer;
		transition: transform 0.2s ease;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}
	
	.game-canvas:hover:not(.playing) {
		transform: scale(1.02);
	}
	
	.game-canvas:active:not(.playing) {
		transform: scale(0.98);
	}
	
	@media (max-width: 900px) {
		.game-canvas {
			width: 100%;
			height: auto;
			max-width: 600px;
		}
	}
	
	@media (max-width: 768px) {
		.game-container {
			padding: 1rem;
		}
		
		.game-header h1 {
			font-size: 2.5rem;
		}
		
		.controls {
			justify-content: center;
		}
		
		.control-item {
			font-size: 1rem;
			padding: 0.6rem 1.2rem;
		}
		
		.breadcrumb {
			font-size: 1rem;
		}
	}
	
	@media (max-width: 480px) {
		.game-card {
			padding: 1rem;
		}
		
		.game-header h1 {
			font-size: 2rem;
		}
		
		.game-header p {
			font-size: 1.2rem;
		}
		
		.game-canvas-container {
			padding: 1rem;
		}
		
		.breadcrumb {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>