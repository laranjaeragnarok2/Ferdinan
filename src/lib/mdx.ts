import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';
import { client } from '@/sanity/lib/client';

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');

// Função auxiliar para converter post do Sanity para o formato unificado
function mapSanityPost(post: any): BlogPost {
    return {
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
}

export async function getPosts(): Promise<BlogPost[]> {
    let allPosts: BlogPost[] = [];

    // 1. Tentar carregar posts locais (.mdx) - PRIORIDADE SOBERANA
    if (fs.existsSync(BLOG_PATH)) {
        const files = fs.readdirSync(BLOG_PATH).filter(f => f.endsWith('.mdx'));
        const localPosts = files.map((fileName) => {
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
                source: 'local'
            } as BlogPost;
        });
        allPosts = [...localPosts];
    }

    // 2. Tentar carregar posts do Sanity (FALLBACK)
    try {
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
            "_updatedAt": _updatedAt
        }`;
        const sanityPosts = await client.fetch(query);
        
        // Adicionar apenas posts do Sanity que NÃO existam localmente (pelo slug)
        const localSlugs = new Set(allPosts.map(p => p.slug));
        const missingPosts = sanityPosts
            .map(mapSanityPost)
            .filter((p: BlogPost) => !localSlugs.has(p.slug));
            
        allPosts = [...allPosts, ...missingPosts];
    } catch (e) {
        console.warn("[SOVEREIGN_FALLBACK] Falha ao conectar ao Sanity. Usando apenas posts locais.");
    }

    return allPosts.sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
}

export async function getPostBySlug(slug: string): Promise<{ data: BlogPost; content: string } | null> {
    // 1. Tentar Local primeiro
    try {
        const fullPath = path.join(BLOG_PATH, `${slug}.mdx`);
        if (fs.existsSync(fullPath)) {
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

            return { data: blogPost, content: content };
        }
    } catch (e) {
        // Segue para o Sanity se falhar local
    }

    // 2. Fallback para Sanity
    try {
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
        if (post) {
            const blogPost = mapSanityPost(post);
            return { data: blogPost, content: blogPost.content };
        }
    } catch (e) {
        return null;
    }

    return null;
}
