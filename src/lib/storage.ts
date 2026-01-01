import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Upload de imagem para o Firebase Storage
 * Substitui o salvamento local para funcionar na Vercel (disco somente-leitura)
 */
export async function uploadImage(file: File): Promise<string> {
    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const filename = `blog/${timestamp}-${randomString}.${extension}`;

    // Criar referência no storage
    const storageRef = ref(storage, filename);

    // Fazer upload
    const bytes = await file.arrayBuffer();
    await uploadBytes(storageRef, new Uint8Array(bytes));

    // Retornar URL pública
    return await getDownloadURL(storageRef);
}

/**
 * Deletar imagem do Firebase Storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    try {
        // Apenas deletar se for do nosso bucket oficial
        if (!imageUrl.includes('firebasestorage.googleapis.com')) {
            return;
        }

        // Extrair o caminho do arquivo da URL (decodificando caracteres especiais)
        const pathStart = imageUrl.indexOf('/o/') + 3;
        const pathEnd = imageUrl.indexOf('?');
        const fullPath = decodeURIComponent(imageUrl.substring(pathStart, pathEnd));

        const storageRef = ref(storage, fullPath);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('Erro ao deletar imagem do Firebase:', error);
    }
}
