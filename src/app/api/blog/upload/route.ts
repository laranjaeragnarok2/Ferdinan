import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { uploadImage } from '@/lib/storage';

// POST /api/blog/upload - Upload de imagem (requer autenticação)
export async function POST(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: Token não encontrado (Auth)' }, { status: 401 });
        }
        if (!token.email) {
            return NextResponse.json({ error: 'Unauthorized: Token sem email (Auth)' }, { status: 401 });
        }
        if (!adminEmails.includes(token.email.toLowerCase())) {
            return NextResponse.json({ error: `Unauthorized: Email ${token.email} não autorizado` }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only images are allowed.' },
                { status: 400 }
            );
        }

        // Validar tamanho (máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.' },
                { status: 400 }
            );
        }

        const imageUrl = await uploadImage(file);

        return NextResponse.json({ url: imageUrl }, { status: 200 });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
