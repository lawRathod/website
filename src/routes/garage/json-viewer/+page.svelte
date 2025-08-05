<script lang="ts">
	let jsonInput = '';
	let parsedJson = null;
	let formattedJson = '';
	let typescriptTypes = '';
	let error = '';
	let activeTab: 'formatted' | 'types' = 'formatted';
	let searchQuery = '';
	let highlightedJson = '';
	let searchMatches = 0;
	let currentMatch = 0;

	function parseJson() {
		error = '';
		parsedJson = null;
		formattedJson = '';
		typescriptTypes = '';

		if (!jsonInput.trim()) {
			error = 'Please enter some JSON to parse';
			return;
		}

		try {
			parsedJson = JSON.parse(jsonInput);
			formattedJson = JSON.stringify(parsedJson, null, 2);
			typescriptTypes = generateTypeScript(parsedJson);
			// Reset search when JSON changes
			searchQuery = '';
			highlightedJson = formattedJson;
			searchMatches = 0;
			currentMatch = 0;
		} catch (e) {
			error = `Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`;
		}
	}

	function generateTypeScript(obj: any, interfaceName = 'Root'): string {
		if (obj === null) return 'null';
		if (obj === undefined) return 'undefined';

		const type = typeof obj;

		if (type === 'boolean') return 'boolean';
		if (type === 'number') return 'number';
		if (type === 'string') return 'string';

		if (Array.isArray(obj)) {
			if (obj.length === 0) return 'any[]';
			const firstElement = obj[0];
			const elementType = generateTypeScript(firstElement, 'ArrayElement');
			return `${elementType}[]`;
		}

		if (type === 'object') {
			const interfaces: string[] = [];
			const properties: string[] = [];

			for (const [key, value] of Object.entries(obj)) {
				const propertyType = getPropertyType(value, key, interfaces);
				const isOptional = value === null || value === undefined;
				properties.push(`  ${key}${isOptional ? '?' : ''}: ${propertyType};`);
			}

			const interfaceDefinition = `interface ${interfaceName} {\n${properties.join('\n')}\n}`;
			interfaces.unshift(interfaceDefinition);

			return interfaces.join('\n\n');
		}

		return 'any';
	}

	function getPropertyType(value: any, key: string, interfaces: string[]): string {
		if (value === null) return 'null';
		if (value === undefined) return 'undefined';

		const type = typeof value;

		if (type === 'boolean') return 'boolean';
		if (type === 'number') return 'number';
		if (type === 'string') return 'string';

		if (Array.isArray(value)) {
			if (value.length === 0) return 'any[]';
			const firstElement = value[0];
			if (typeof firstElement === 'object' && firstElement !== null) {
				const interfaceName = capitalize(key) + 'Item';
				const elementInterface = generateTypeScript(firstElement, interfaceName);
				interfaces.push(elementInterface);
				return `${interfaceName}[]`;
			}
			return `${typeof firstElement}[]`;
		}

		if (type === 'object') {
			const interfaceName = capitalize(key);
			const nestedInterface = generateTypeScript(value, interfaceName);
			interfaces.push(nestedInterface);
			return interfaceName;
		}

		return 'any';
	}

	function capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function clearAll() {
		jsonInput = '';
		parsedJson = null;
		formattedJson = '';
		typescriptTypes = '';
		error = '';
		activeTab = 'formatted';
		searchQuery = '';
		highlightedJson = '';
		searchMatches = 0;
		currentMatch = 0;
	}

	function searchInJson() {
		if (!formattedJson || !searchQuery.trim()) {
			highlightedJson = formattedJson;
			searchMatches = 0;
			currentMatch = 0;
			return;
		}

		const query = searchQuery.trim();
		const regex = new RegExp(escapeRegExp(query), 'gi');
		const matches = formattedJson.match(regex);
		searchMatches = matches ? matches.length : 0;
		currentMatch = searchMatches > 0 ? 1 : 0;

		// Highlight all matches
		highlightedJson = formattedJson.replace(regex, (match, offset) => {
			const matchIndex = (formattedJson.substring(0, offset).match(regex) || []).length + 1;
			const isActive = matchIndex === currentMatch;
			return `<mark class="${isActive ? 'search-highlight-active' : 'search-highlight'}">${match}</mark>`;
		});
	}

	function escapeRegExp(string: string): string {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function nextMatch() {
		if (searchMatches === 0) return;
		currentMatch = currentMatch < searchMatches ? currentMatch + 1 : 1;
		searchInJson();
	}

	function prevMatch() {
		if (searchMatches === 0) return;
		currentMatch = currentMatch > 1 ? currentMatch - 1 : searchMatches;
		searchInJson();
	}

	function clearSearch() {
		searchQuery = '';
		highlightedJson = formattedJson;
		searchMatches = 0;
		currentMatch = 0;
	}

	// Reactive statement to update search when query changes
	$: if (searchQuery !== undefined) {
		searchInJson();
	}

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text).then(() => {
			// Could add a toast notification here
		});
	}

	// Sample JSON for demonstration
	const sampleJson = `{
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "profile": {
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Software developer"
    },
    "tags": ["developer", "typescript", "react"],
    "scores": [95, 87, 92]
  },
  "metadata": {
    "createdAt": "2024-01-15T10:30:00Z",
    "version": "1.0.0"
  }
}`;

	function loadSample() {
		jsonInput = sampleJson;
		parseJson();
	}
</script>

<svelte:head>
	<title>JSON Viewer - Garage</title>
	<meta
		name="description"
		content="Parse JSON and extract TypeScript types - A development tool by Prateek Rathod"
	/>
</svelte:head>

<div class="container">
	<header class="header">
		<nav class="nav">
			<a href="/" class="nav-link">Home</a>
			<span class="nav-separator">→</span>
			<a href="/garage" class="nav-link">Garage</a>
		</nav>

		<h1 class="title">JSON Viewer</h1>
		<p class="subtitle">Parse JSON and extract TypeScript types</p>
	</header>

	<main class="tool">
		<section class="input-section">
			<div class="section-header">
				<h2 class="section-title">Input</h2>
				<div class="actions">
					<button type="button" class="action-btn" on:click={loadSample}> Load Sample </button>
					<button type="button" class="action-btn" on:click={clearAll}> Clear </button>
				</div>
			</div>

			<textarea
				bind:value={jsonInput}
				placeholder="Paste your JSON here..."
				class="json-input"
				rows="12"
				spellcheck="false"
			></textarea>

			<div class="input-actions">
				<button type="button" class="parse-btn" on:click={parseJson}> Parse JSON </button>
			</div>
		</section>

		{#if error}
			<section class="error-section">
				<div class="error">
					<span class="error-icon">⚠️</span>
					<span class="error-message">{error}</span>
				</div>
			</section>
		{/if}

		{#if formattedJson || typescriptTypes}
			<section class="output-section">
				<div class="section-header">
					<div class="tabs">
						<button
							type="button"
							class="tab"
							class:active={activeTab === 'formatted'}
							on:click={() => (activeTab = 'formatted')}
						>
							Formatted JSON
						</button>
						<button
							type="button"
							class="tab"
							class:active={activeTab === 'types'}
							on:click={() => (activeTab = 'types')}
						>
							TypeScript Types
						</button>
					</div>
				</div>

				{#if activeTab === 'formatted' && formattedJson}
					<div class="output-wrapper">
						<div class="output-header">
							<span class="output-label">Formatted JSON</span>
							<div class="header-actions">
								<div class="search-controls">
									<div class="search-input-wrapper">
										<input
											type="text"
											bind:value={searchQuery}
											placeholder="Search in JSON..."
											class="search-input"
											on:keydown={(e) => {
												if (e.key === 'Enter') {
													e.preventDefault();
													nextMatch();
												} else if (e.key === 'Escape') {
													clearSearch();
												}
											}}
										/>
										{#if searchQuery}
											<button
												type="button"
												class="clear-search-btn"
												on:click={clearSearch}
												aria-label="Clear search"
											>
												×
											</button>
										{/if}
									</div>
									{#if searchMatches > 0}
										<div class="search-navigation">
											<span class="search-results">{currentMatch}/{searchMatches}</span>
											<button
												type="button"
												class="nav-btn"
												on:click={prevMatch}
												disabled={searchMatches === 0}
												aria-label="Previous match"
											>
												↑
											</button>
											<button
												type="button"
												class="nav-btn"
												on:click={nextMatch}
												disabled={searchMatches === 0}
												aria-label="Next match"
											>
												↓
											</button>
										</div>
									{/if}
								</div>
								<button
									type="button"
									class="copy-btn"
									on:click={() => copyToClipboard(formattedJson)}
									aria-label="Copy formatted JSON"
								>
									Copy
								</button>
							</div>
						</div>
						<pre class="output-content json-output"><code
								>{@html highlightedJson || formattedJson}</code
							></pre>
					</div>
				{/if}

				{#if activeTab === 'types' && typescriptTypes}
					<div class="output-wrapper">
						<div class="output-header">
							<span class="output-label">TypeScript Interface</span>
							<button
								type="button"
								class="copy-btn"
								on:click={() => copyToClipboard(typescriptTypes)}
								aria-label="Copy TypeScript types"
							>
								Copy
							</button>
						</div>
						<pre class="output-content ts-output"><code>{typescriptTypes}</code></pre>
					</div>
				{/if}
			</section>
		{/if}
	</main>
</div>

<style>
	.container {
		min-height: 100vh;
		padding: 2rem;
		max-width: 1200px;
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

	.nav {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
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
		margin: 0 0 2rem 0;
		font-style: italic;
	}

	.tool {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.section-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		padding: 0.5rem 1rem;
		background: transparent;
		border: 1px solid var(--border-color, #e5e7eb);
		border-radius: 4px;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.action-btn:hover,
	.action-btn:focus {
		border-color: var(--theme-color, #6366f1);
		color: var(--text-primary);
		outline: none;
	}

	.json-input {
		width: 100%;
		min-height: 300px;
		padding: 1rem;
		font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
		font-size: 0.875rem;
		line-height: 1.5;
		border: 1px solid var(--border-color, #e5e7eb);
		border-radius: 6px;
		background: var(--bg-card, #ffffff);
		color: var(--text-primary);
		resize: vertical;
		outline: none;
	}

	.json-input:focus {
		border-color: var(--theme-color, #6366f1);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
	}

	.input-actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}

	.parse-btn {
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.75rem 1.5rem;
		background: var(--theme-color, #6366f1);
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.parse-btn:hover,
	.parse-btn:focus {
		background: var(--theme-color-dark, #5855eb);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
		outline: none;
	}

	.error-section {
		margin: 1rem 0;
	}

	.error {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: 6px;
		color: #dc2626;
	}

	.error-icon {
		font-size: 1rem;
	}

	.error-message {
		font-size: 0.875rem;
		font-weight: 500;
	}

	.tabs {
		display: flex;
		gap: 0.5rem;
		border-bottom: 1px solid var(--border-color, #e5e7eb);
		margin-bottom: 1rem;
	}

	.tab {
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		border-bottom: 2px solid transparent;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab:hover,
	.tab:focus {
		color: var(--text-primary);
		outline: none;
	}

	.tab.active {
		color: var(--theme-color, #6366f1);
		border-bottom-color: var(--theme-color, #6366f1);
	}

	.output-wrapper {
		border: 1px solid var(--border-color, #e5e7eb);
		border-radius: 6px;
		overflow: hidden;
	}

	.output-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
		background: var(--bg-secondary, #f8f9fa);
		border-bottom: 1px solid var(--border-color, #e5e7eb);
		gap: 1rem;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.search-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-input {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		padding: 0.375rem 0.75rem;
		padding-right: 2rem;
		width: 200px;
		border: 1px solid var(--border-color, #e5e7eb);
		border-radius: 4px;
		background: var(--bg-card, #ffffff);
		color: var(--text-primary);
		outline: none;
		transition: all 0.2s ease;
	}

	.search-input:focus {
		border-color: var(--theme-color, #6366f1);
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
	}

	.clear-search-btn {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		font-size: 1rem;
		line-height: 1;
		padding: 0;
		width: 1rem;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2px;
		transition: all 0.2s ease;
	}

	.clear-search-btn:hover,
	.clear-search-btn:focus {
		background: var(--bg-secondary, #f3f4f6);
		color: var(--text-primary);
		outline: none;
	}

	.search-navigation {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.search-results {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.7rem;
		color: var(--text-secondary);
		min-width: 3rem;
		text-align: center;
	}

	.nav-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		padding: 0.25rem;
		width: 1.5rem;
		height: 1.5rem;
		background: transparent;
		border: 1px solid var(--border-color, #e5e7eb);
		border-radius: 3px;
		color: var(--text-secondary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.nav-btn:hover:not(:disabled),
	.nav-btn:focus:not(:disabled) {
		border-color: var(--theme-color, #6366f1);
		color: var(--theme-color, #6366f1);
		background: rgba(99, 102, 241, 0.05);
		outline: none;
	}

	.nav-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.output-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.copy-btn {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		background: transparent;
		border: 1px solid var(--border-color, #e5e7eb);
		border-radius: 3px;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.copy-btn:hover,
	.copy-btn:focus {
		border-color: var(--theme-color, #6366f1);
		color: var(--theme-color, #6366f1);
		outline: none;
	}

	.output-content {
		padding: 1rem;
		margin: 0;
		font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
		font-size: 0.875rem;
		line-height: 1.5;
		background: var(--bg-card, #ffffff);
		color: var(--text-primary);
		overflow-x: auto;
		white-space: pre;
	}

	.json-output code {
		color: var(--text-primary);
	}

	.ts-output code {
		color: var(--text-primary);
	}

	/* Search highlighting styles */
	.json-output :global(.search-highlight) {
		background: rgba(255, 235, 59, 0.3);
		color: var(--text-primary);
		padding: 0;
		border-radius: 2px;
	}

	.json-output :global(.search-highlight-active) {
		background: rgba(255, 193, 7, 0.6);
		color: var(--text-primary);
		padding: 0;
		border-radius: 2px;
		box-shadow: 0 0 0 1px rgba(255, 193, 7, 0.8);
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.title {
			font-size: 2rem;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.json-input {
			min-height: 200px;
		}

		.tabs {
			width: 100%;
			justify-content: center;
		}

		.output-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.header-actions {
			width: 100%;
			flex-direction: column;
			gap: 0.75rem;
		}

		.search-controls {
			width: 100%;
			flex-wrap: wrap;
		}

		.search-input {
			width: 100%;
			min-width: 200px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none !important;
			transform: none !important;
		}
	}
</style>
