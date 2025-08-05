import { getPostsMetadata } from '$lib/posts.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getPostsMetadata();
	return {
		posts
	};
};
