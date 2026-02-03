import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';

export const dynamic = 'force-dynamic';

// GET /api/blog/posts/[slug] - Buscar post por slug (Sanity)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

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

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const formattedPost = {
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
            published: true
        };

        return NextResponse.json({ post: formattedPost }, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        );
    }
}

// DELETE /api/blog/posts/[slug] - Deletar post (Sanity)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        // Buscar ID do post
        const id = await client.fetch(`*[_type == "post" && slug.current == $slug][0]._id`, { slug });

        if (!id) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        await writeClient.delete(id);

        return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}


// PUT /api/blog/posts/[slug] - Atualizar post (Sanity)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        // Buscar ID do post
        const id = await client.fetch(`*[_type == "post" && slug.current == $slug][0]._id`, { slug });

        if (!id) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Preparar patch
        const patch: any = {
            updatedAt: new Date().toISOString()
        };

        if (body.title) patch.title = body.title;
        if (body.description) patch.description = body.description;
        if (body.content) patch.content = body.content;
        if (body.published !== undefined) patch.publishedAt = body.published ? new Date().toISOString() : null;
        if (body.tags) patch.tags = body.tags;

        if (body.coverImageAssetId) {
            patch.coverImage = {
                _type: 'image',
                asset: {
                    _ref: body.coverImageAssetId
                }
            };
        }

        await writeClient.patch(id).set(patch).commit();

        return NextResponse.json({ message: 'Post updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            { error: 'Failed to update post' },
            { status: 500 }
        );
    }
}
