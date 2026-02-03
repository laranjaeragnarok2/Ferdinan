import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/mdx';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-dynamic';

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');

// GET /api/blog/posts/[slug] - Buscar post por slug (MDX)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const result = await getPostBySlug(slug);

        if (!result) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const post = {
            ...result.data,
            content: result.content,
            slug
        };

        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/posts/[slug] - Deletar post (Apenas localmente ou servidor com write access)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const mdxPath = path.join(BLOG_PATH, `${slug}.mdx`);
        const mdPath = path.join(BLOG_PATH, `${slug}.md`);

        if (fs.existsSync(mdxPath)) {
            fs.unlinkSync(mdxPath);
            return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
        } else if (fs.existsSync(mdPath)) {
            fs.unlinkSync(mdPath);
            return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}


// PUT /api/blog/posts/[slug] - Atualizar post
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        // Determinar arquivo existente
        let filePath = path.join(BLOG_PATH, `${slug}.mdx`);
        if (!fs.existsSync(filePath)) {
            filePath = path.join(BLOG_PATH, `${slug}.md`);
        }

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Ler arquivo atual para preservar conteúdo se não enviado
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: currentFrontmatter, content: currentContent } = matter(fileContent);

        // Mesclar dados
        const newFrontmatter = {
            ...currentFrontmatter,
            ...body, // Atualiza campos passados no body (ex: published)
            updatedAt: new Date().toISOString() // Atualiza data
        };

        // Se content foi passado no body, usa, senão mantém o atual
        // Nota: O body pode não ter content se for apenas togglePublished
        const newContent = body.content !== undefined ? body.content : currentContent;

        // Recriar arquivo com gray-matter
        const newFileContent = matter.stringify(newContent, newFrontmatter);

        fs.writeFileSync(filePath, newFileContent);

        return NextResponse.json({ message: 'Post updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            { error: 'Failed to update post' },
            { status: 500 }
        );
    }
}
