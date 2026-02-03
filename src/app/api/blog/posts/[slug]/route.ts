import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/mdx';

export const dynamic = 'force-dynamic';

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
// PUT e DELETE removidos pois MDX é baseado em arquivos estáticos via Git

