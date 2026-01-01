import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'blog-images');

// Garantir que o diretório existe
async function ensureUploadDir() {
    if (!existsSync(UPLOAD_DIR)) {
        await mkdir(UPLOAD_DIR, { recursive: true });
    }
}

// Upload de imagem
export async function uploadImage(file: File): Promise<string> {
    await ensureUploadDir();

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${randomString}.${extension}`;

    // Converter File para Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Salvar arquivo
    const filepath = join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);

    // Retornar URL pública
    return `/blog-images/${filename}`;
}

// Deletar imagem (opcional, para quando deletar posts)
export async function deleteImage(imageUrl: string): Promise<void> {
    if (!imageUrl.startsWith('/blog-images/')) {
        return;
    }

    const filename = imageUrl.replace('/blog-images/', '');
    const filepath = join(UPLOAD_DIR, filename);

    if (existsSync(filepath)) {
        const { unlink } = await import('fs/promises');
        await unlink(filepath);
    }
}
