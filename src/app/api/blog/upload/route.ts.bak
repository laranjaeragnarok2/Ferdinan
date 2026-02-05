import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { writeClient } from '@/sanity/lib/write-client';

export const dynamic = 'force-dynamic';

// POST /api/blog/upload - Upload de imagem para o Sanity
export async function POST(request: NextRequest) {
    try {
        // Verificar autenticação
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());

        if (!token || !token.email || !adminEmails.includes(token.email.toLowerCase())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validar tipo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        // Upload para Sanity
        const buffer = await file.arrayBuffer();
        const asset = await writeClient.assets.upload('image', Buffer.from(buffer), {
            filename: file.name,
            contentType: file.type
        });

        return NextResponse.json({
            url: asset.url,
            assetId: asset._id
        }, { status: 200 });

    } catch (error) {
        console.error('Error uploading image to Sanity:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
