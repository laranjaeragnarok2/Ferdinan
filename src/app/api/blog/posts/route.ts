import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPosts, createPost, getPostById } from '@/lib/firestore';
import { CreateBlogPostInput } from '@/types/blog';

export const dynamic = 'force-dynamic';

// GET /api/blog/posts - Listar posts
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const tag = searchParams.get('tag');
        const search = searchParams.get('search');
        const limitParam = searchParams.get('limit');
        const id = searchParams.get('id');

        if (id) {
            const post = await getPostById(id);
            return NextResponse.json({ posts: post ? [post] : [] }, { status: 200 });
        }

        const options = {
            published: published === 'true' ? true : published === 'false' ? false : undefined,
            tag: tag || undefined,
            searchQuery: search || undefined,
            limitCount: limitParam ? parseInt(limitParam) : undefined,
        };

        const posts = await getPosts(options);

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

// POST /api/blog/posts - Criar novo post (requer autenticação)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body: CreateBlogPostInput = await request.json();

        // Validação básica
        if (!body.title || !body.content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        const post = await createPost(body);

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
