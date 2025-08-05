import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const POSTS_DIR = resolve('posts');
const OUTPUT_DIR = resolve('src/lib/data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'posts.json');

async function buildPosts() {
	try {
		// Ensure output directory exists
		await mkdir(OUTPUT_DIR, { recursive: true });

		const files = await readdir(POSTS_DIR);
		const markdownFiles = files.filter((file) => file.endsWith('.md') && file !== 'README.md');

		const posts = await Promise.all(
			markdownFiles.map(async (file) => {
				const slug = file.replace('.md', '');
				const filePath = join(POSTS_DIR, file);
				const fileContent = await readFile(filePath, 'utf-8');

				const { data, content } = matter(fileContent);
				const htmlContent = await marked(content);

				return {
					slug,
					title: data.title || slug.charAt(0).toUpperCase() + slug.slice(1),
					date: data.date,
					description: data.description,
					tags: data.tags || [],
					published: data.published !== false,
					author: data.author,
					content: htmlContent,
					rawContent: content
				};
			})
		);

		// Filter published posts and sort by date (newest first) or by title if no date
		const sortedPosts = posts
			.filter((post) => post.published)
			.sort((a, b) => {
				if (a.date && b.date) {
					return new Date(b.date).getTime() - new Date(a.date).getTime();
				}
				return a.title.localeCompare(b.title);
			});

		await writeFile(OUTPUT_FILE, JSON.stringify(sortedPosts, null, 2));
		console.log(`Built ${sortedPosts.length} posts to ${OUTPUT_FILE}`);
	} catch (error) {
		console.error('Error building posts:', error);
		process.exit(1);
	}
}

buildPosts();