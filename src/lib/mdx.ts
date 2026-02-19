import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');

export async function getPosts(): Promise<BlogPost[]> {
    const files = fs.readdirSync(BLOG_PATH).filter(f => f.endsWith('.mdx'));
    
    const posts = files.map((fileName) => {
        const fullPath = path.join(BLOG_PATH, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = fileName.replace(/\.mdx$/, '');

        return {
            id: slug,
            slug: slug,
            title: data.title || 'Untitled',
            description: data.description || '',
            content: content,
            coverImage: data.coverImage || '',
            author: data.author || { name: 'Admin' },
            tags: data.tags || [],
            publishedAt: data.publishedAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString(),
            published: true,
        };
    });

    return posts.sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
}

export async function getPostBySlug(slug: string): Promise<{ data: BlogPost; content: string } | null> {
    try {
        const fullPath = path.join(BLOG_PATH, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) return null;
        
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const blogPost: BlogPost = {
            id: slug,
            slug: slug,
            title: data.title || 'Untitled',
            description: data.description || '',
            content: content,
            coverImage: data.coverImage || '',
            author: data.author || { name: 'Admin' },
            tags: data.tags || [],
            publishedAt: data.publishedAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString(),
            published: true,
        };

        return {
            data: blogPost,
            content: content,
        };
    } catch (e) {
        return null;
    }
}
