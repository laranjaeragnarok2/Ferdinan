import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getPostBySlug, updatePost, deletePost } from '@/lib/firestore';
import { UpdateBlogPostInput } from '@/types/blog';

export const dynamic = 'force-dynamic';

// GET /api/blog/posts/[slug] - Buscar post por slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const post = await getPostBySlug(slug);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        );
    }
}

// PUT /api/blog/posts/[slug] - Atualizar post (requer autenticação)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: Token não encontrado' }, { status: 401 });
        }
        if (!token.email) {
            return NextResponse.json({ error: 'Unauthorized: Token sem email' }, { status: 401 });
        }
        if (!adminEmails.includes(token.email.toLowerCase())) {
            return NextResponse.json({ error: `Unauthorized: Email ${token.email} não autorizado` }, { status: 401 });
        }

        const post = await getPostBySlug(slug);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const body: Partial<UpdateBlogPostInput> = await request.json();

        await updatePost({
            id: post.id,
            ...body,
        });

        return NextResponse.json(
            { message: 'Post updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            { error: 'Failed to update post' },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/posts/[slug] - Deletar post (requer autenticação)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: Token não encontrado' }, { status: 401 });
        }
        if (!token.email) {
            return NextResponse.json({ error: 'Unauthorized: Token sem email' }, { status: 401 });
        }
        if (!adminEmails.includes(token.email.toLowerCase())) {
            return NextResponse.json({ error: `Unauthorized: Email ${token.email} não autorizado` }, { status: 401 });
        }

        const post = await getPostBySlug(slug);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        await deletePost(post.id);

        return NextResponse.json(
            { message: 'Post deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}
