import postsData from './data/posts.json';

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

const posts: Post[] = postsData as Post[];

export async function getAllPosts(): Promise<Post[]> {
	return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	return posts.find(post => post.slug === slug) || null;
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
