import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface Post {
	slug: string;
	title: string;
	date?: string;
	description?: string;
	tags?: string[];
	published?: boolean;
	author?: string;
	content: string;
	rawContent: string;
}

export interface PostMetadata {
	slug: string;
	title: string;
	date?: string;
	description?: string;
	tags?: string[];
	published?: boolean;
	author?: string;
}

const POSTS_DIR = 'posts';

export async function getAllPosts(): Promise<Post[]> {
	try {
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
					published: data.published !== false, // Default to true if not specified
					author: data.author,
					content: htmlContent,
					rawContent: content
				} as Post;
			})
		);

		// Filter published posts and sort by date (newest first) or by title if no date
		return posts
			.filter((post) => post.published)
			.sort((a, b) => {
				if (a.date && b.date) {
					return new Date(b.date).getTime() - new Date(a.date).getTime();
				}
				return a.title.localeCompare(b.title);
			});
	} catch (error) {
		console.error('Error loading posts:', error);
		return [];
	}
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		const filePath = join(POSTS_DIR, `${slug}.md`);
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
		} as Post;
	} catch (error) {
		console.error(`Error loading post ${slug}:`, error);
		return null;
	}
}

export async function getPostsMetadata(): Promise<PostMetadata[]> {
	const posts = await getAllPosts();
	return posts.map(({ slug, title, date, description, tags, published, author }) => ({
		slug,
		title,
		date,
		description,
		tags,
		published,
		author
	}));
}
