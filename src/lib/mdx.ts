import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');

export async function getPosts() {
    const files = fs.readdirSync(BLOG_PATH);
    const posts = files.map((file) => {
        const source = fs.readFileSync(path.join(BLOG_PATH, file), 'utf8');
        const { data } = matter(source);
        const slug = file.replace('.mdx', '').replace('.md', '');
        return {
            ...data,
            id: slug,
            slug,
            publishedAt: data.date || new Date().toISOString(),
            updatedAt: data.date || new Date().toISOString(),
            published: data.published !== undefined ? data.published : true,
            tags: data.tags || [],
        };
    });

    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string) {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        const mdPath = path.join(BLOG_PATH, `${slug}.md`);
        if (!fs.existsSync(mdPath)) return null;
        const source = fs.readFileSync(mdPath, 'utf8');
        return matter(source);
    }
    const source = fs.readFileSync(filePath, 'utf8');
    return matter(source);
}
