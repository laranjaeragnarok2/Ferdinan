import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/mdx';

export const dynamic = 'force-dynamic';

// GET /api/blog/posts - Listar posts do MDX
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const search = searchParams.get('search');
        const limitParam = searchParams.get('limit');

        let posts = await getPosts();

        if (published === 'true') {
            posts = posts.filter(p => p.published);
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
