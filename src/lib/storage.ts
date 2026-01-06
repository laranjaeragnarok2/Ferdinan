import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Upload de imagem para o Firebase Storage
 * Substitui o salvamento local para funcionar na Vercel (disco somente-leitura)
 */
export async function uploadImage(file: File): Promise<string> {
    try {
        // Validar se o storage foi inicializado
        if (!storage) {
            throw new Error('Firebase Storage não foi inicializado. Verifique as variáveis de ambiente.');
        }

        // Gerar nome único para o arquivo
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const extension = file.name.split('.').pop();
        const filename = `blog/${timestamp}-${randomString}.${extension}`;

        console.log(`[Storage] Iniciando upload: ${filename}`);

        // Criar referência no storage
        const storageRef = ref(storage, filename);

        // Fazer upload
        const bytes = await file.arrayBuffer();
        await uploadBytes(storageRef, new Uint8Array(bytes));

        console.log(`[Storage] Upload concluído: ${filename}`);

        // Retornar URL pública
        const downloadURL = await getDownloadURL(storageRef);
        console.log(`[Storage] URL gerada: ${downloadURL}`);

        return downloadURL;
    } catch (error) {
        console.error('[Storage] Erro ao fazer upload:', error);

        // Fornecer mensagens de erro mais específicas
        if (error instanceof Error) {
            if (error.message.includes('storage/unauthorized')) {
                throw new Error('Sem permissão para fazer upload. Verifique as regras do Firebase Storage.');
            }
            if (error.message.includes('storage/unauthenticated')) {
                throw new Error('Usuário não autenticado. Faça login novamente.');
            }
            if (error.message.includes('storage/quota-exceeded')) {
                throw new Error('Cota de armazenamento excedida.');
            }
        }

        throw error;
    }
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
