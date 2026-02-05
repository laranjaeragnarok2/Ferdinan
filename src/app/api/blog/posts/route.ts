import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';

export const dynamic = 'force-dynamic';

// GET /api/blog/posts - Listar posts do Sanity
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const published = searchParams.get('published');
        const search = searchParams.get('search');
        const limitParam = searchParams.get('limit');
        const id = searchParams.get('id');

        console.log('Fetching posts with params:', { published, search, limitParam, id });

        // Construir query GROQ
        let filters = ['_type == "post"'];
        const params: any = {};

        if (id) {
            filters.push('_id == $id');
            params.id = id;
        }

        if (search) {
            filters.push('(title match $search + "*" || description match $search + "*")');
            params.search = search;
        }

        const query = `*[${filters.join(' && ')}] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            description,
            content,
            "coverImage": coverImage.asset->url,
            "author": author->{name, "avatar": avatar.asset->url},
            "tags": coalesce(tags, categories[]->title),
            publishedAt,
            "_updatedAt": _updatedAt
        }${limitParam ? `[0...${limitParam}]` : ''}`;

        const sanityPosts = await client.fetch(query, params);

        const posts = sanityPosts.map((post: any) => ({
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
        }));

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts from Sanity:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

// POST /api/blog/posts - Criar novo post no Sanity
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, content, description, coverImageAssetId, tags, author, published } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // Gerar slug a partir do título
        const slug = title
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const newPost: any = {
            _type: 'post',
            title,
            slug: { current: slug },
            content,
            description,
            tags: tags || [],
            publishedAt: published ? new Date().toISOString() : null,
        };

        if (coverImageAssetId) {
            newPost.coverImage = {
                _type: 'image',
                asset: {
                    _ref: coverImageAssetId
                }
            };
        }

        // Criar documento
        const result = await writeClient.create(newPost);

        return NextResponse.json(
            { message: 'Post created successfully', slug, id: result._id },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creating post in Sanity:', error);
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
