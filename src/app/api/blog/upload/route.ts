import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { uploadImage } from '@/lib/storage';

// POST /api/blog/upload - Upload de imagem (requer autenticação)
export async function POST(request: NextRequest) {
    console.log('🔍 [API Upload] Requisição recebida');

    try {
        // Verificar autenticação
        console.log('🔐 [API Upload] Verificando autenticação...');
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase());

        console.log('🔐 [API Upload] Token:', token ? '✅ Presente' : '❌ Ausente');
        console.log('🔐 [API Upload] Email do token:', token?.email || 'N/A');
        console.log('🔐 [API Upload] Emails admin:', adminEmails);

        if (!token) {
            console.error('❌ [API Upload] Token não encontrado');
            return NextResponse.json({ error: 'Unauthorized: Token não encontrado (Auth)' }, { status: 401 });
        }
        if (!token.email) {
            console.error('❌ [API Upload] Token sem email');
            return NextResponse.json({ error: 'Unauthorized: Token sem email (Auth)' }, { status: 401 });
        }
        if (!adminEmails.includes(token.email.toLowerCase())) {
            console.error('❌ [API Upload] Email não autorizado:', token.email);
            return NextResponse.json({ error: `Unauthorized: Email ${token.email} não autorizado` }, { status: 401 });
        }

        console.log('✅ [API Upload] Autenticação bem-sucedida');

        // Processar arquivo
        console.log('📁 [API Upload] Processando FormData...');
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            console.error('❌ [API Upload] Nenhum arquivo fornecido');
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        console.log('📁 [API Upload] Arquivo recebido:', {
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024).toFixed(2)}KB`
        });

        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            console.error('❌ [API Upload] Tipo de arquivo inválido:', file.type);
            return NextResponse.json(
                { error: 'Invalid file type. Only images are allowed.' },
                { status: 400 }
            );
        }

        // Validar tamanho (máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            console.error('❌ [API Upload] Arquivo muito grande:', `${(file.size / 1024 / 1024).toFixed(2)}MB`);
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.' },
                { status: 400 }
            );
        }

        console.log('✅ [API Upload] Validações passaram, iniciando upload no Firebase Storage...');

        const imageUrl = await uploadImage(file);

        console.log('✅ [API Upload] Upload concluído com sucesso!');
        console.log('🔗 [API Upload] URL gerada:', imageUrl);

        return NextResponse.json({ url: imageUrl }, { status: 200 });
    } catch (error) {
        console.error('❌ [API Upload] Erro capturado:', error);

        // Log detalhado do erro
        if (error instanceof Error) {
            console.error('❌ [API Upload] Mensagem:', error.message);
            console.error('❌ [API Upload] Stack:', error.stack);
        }

        return NextResponse.json(
            {
                error: 'Failed to upload image',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
