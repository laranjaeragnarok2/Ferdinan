import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/mdx';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-dynamic';

// GET /api/blog/posts - Listar posts do MDX
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const search = searchParams.get('search');
        const limitParam = searchParams.get('limit');
        const id = searchParams.get('id');

        let posts = (await getPosts()) as any[];

        if (published === 'true') {
            posts = posts.filter(p => p.published);
        }

        if (id) {
            posts = posts.filter(p => p.id === id);
        }

        if (search) {
            const lower = search.toLowerCase();
            posts = posts.filter(p =>
                p.title?.toLowerCase().includes(lower) ||
                p.description?.toLowerCase().includes(lower)
            );
        }

        if (limitParam) {
            posts = posts.slice(0, parseInt(limitParam));
        }

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');

// POST /api/blog/posts - Criar novo post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, ...rest } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // Gerar slug a partir do título
        const slug = title
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^a-z0-9]+/g, '-') // Substitui não alfanuméricos por hífens
            .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim

        // Verificar se arquivo já existe
        const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
        if (fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: 'Post with this title already exists' },
                { status: 409 }
            );
        }

        // Preparar frontmatter
        const frontmatter = {
            title,
            ...rest,
            date: new Date().toISOString(),
        };

        // Criar conteúdo do arquivo
        const fileContent = matter.stringify(content, frontmatter);

        // Garantir que diretório existe
        if (!fs.existsSync(BLOG_PATH)) {
            fs.mkdirSync(BLOG_PATH, { recursive: true });
        }

        // Escrever arquivo
        fs.writeFileSync(filePath, fileContent);

        return NextResponse.json(
            { message: 'Post created successfully', slug },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
