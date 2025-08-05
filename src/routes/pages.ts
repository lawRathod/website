export const pages = ['games', 'tools', 'blogs', 'people', 'projects', 'contact'] as const;

export const pageDetails: Record<(typeof pages)[number], { icon: string; description: string }> = {
	games: { icon: '🎮', description: 'Fun interactive experiences' },
	tools: { icon: '🛠️', description: "Useful utilities I've built" },
	blogs: { icon: '📝', description: 'My thoughts and learnings' },
	people: { icon: '✨', description: 'Amazing folks I admire' },
	projects: { icon: '🚀', description: "Exciting projects I've worked on" },
	contact: { icon: '💬', description: "Let's connect!" }
};
