import { client } from '@/sanity/lib/client';
import { BlogPost } from '@/types/blog';

export async function getPosts(): Promise<BlogPost[]> {
    const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        content,
        "coverImage": coverImage.asset->url,
        "author": author->{name, "avatar": avatar.asset->url},
        "tags": tags,
        publishedAt,
        "_updatedAt": _updatedAt,
        "published": true // Sanity drafts are handled by perspective, here assuming published
    }`;

    const posts = await client.fetch(query);

    return posts.map((post: any) => ({
        id: post._id,
        slug: post.slug,
        title: post.title,
        description: post.description || '',
        content: post.content || '',
        coverImage: post.coverImage || '',
        author: post.author || { name: 'Admin' },
        tags: post.tags || [],
        publishedAt: post.publishedAt || new Date().toISOString(),
        updatedAt: post._updatedAt || new Date().toISOString(),
        published: true, // If fetched via public client, it's published
    }));
}

export async function getPostBySlug(slug: string): Promise<{ data: BlogPost; content: string } | null> {
    const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        content,
        "coverImage": coverImage.asset->url,
        "author": author->{name, "avatar": avatar.asset->url},
        "tags": tags,
        publishedAt,
        "_updatedAt": _updatedAt
    }`;

    const post = await client.fetch(query, { slug });

    if (!post) return null;

    const blogPost: BlogPost = {
        id: post._id,
        slug: post.slug,
        title: post.title,
        description: post.description || '',
        content: post.content || '',
        coverImage: post.coverImage || '',
        author: post.author || { name: 'Admin' },
        tags: post.tags || [],
        publishedAt: post.publishedAt || new Date().toISOString(),
        updatedAt: post._updatedAt || new Date().toISOString(),
        published: true,
    };

    return {
        data: blogPost,
        content: blogPost.content,
    };
}
