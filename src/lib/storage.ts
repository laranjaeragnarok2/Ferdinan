import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Upload de imagem para o Firebase Storage
 * Suporta arquivos maiores e gera URLs públicas
 */
export async function uploadImage(file: File): Promise<string> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 [UPLOAD] Iniciando upload para Storage');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        // 1. Validar Storage
        console.log('📋 [STEP 1] Validando Firebase Storage...');
        if (!storage) {
            console.error('❌ [ERRO] Storage não inicializado!');
            throw new Error('Firebase Storage não foi inicializado. Verifique as variáveis de ambiente.');
        }
        console.log('✅ [STEP 1] Storage inicializado com sucesso');
        console.log('   📦 Bucket:', storage.app.options.storageBucket);

        // 2. Log da imagem
        console.log('\n📋 [STEP 2] Analisando imagem...');
        console.log('   📁 Arquivo:', file.name);
        console.log('   📏 Tamanho:', (file.size / 1024).toFixed(2), 'KB');
        console.log('   🎨 Tipo:', file.type);

        // 3. Validar tamanho (Limite aumentado para 5MB)
        console.log('\n📋 [STEP 3] Validando tamanho...');
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            console.warn('⚠️ [AVISO] Imagem maior que o permitido');
            console.warn('   📏 Tamanho:', (file.size / 1024).toFixed(2), 'KB');
            console.warn('   🎯 Máximo:', (maxSize / 1024).toFixed(2), 'KB');
            throw new Error(`Imagem muito grande. Máximo permitido: 5MB. Tamanho enviado: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        }
        console.log('✅ [STEP 3] Tamanho validado');

        // 4. Criar referência e fazer upload
        console.log('\n📋 [STEP 4] Fazendo upload para o Storage...');
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const storageRef = ref(storage, `blog/${fileName}`);

        const metadata = {
            contentType: file.type,
        };

        const snapshot = await uploadBytes(storageRef, file, metadata);
        console.log('✅ [STEP 4] Upload concluído');

        // 5. Gerar URL de download
        console.log('\n📋 [STEP 5] Gerando URL pública...');
        const downloadUrl = await getDownloadURL(snapshot.ref);
        console.log('✅ [STEP 5] URL gerada com sucesso');
        console.log('   🔗 URL:', downloadUrl);

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 [SUCESSO] Upload finalizado com sucesso!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        return downloadUrl;
    } catch (error: any) {
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('💥 [ERRO] Falha no upload!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        console.error('📋 Detalhes do erro:');
        console.error('   ❌ Tipo:', error.constructor?.name || 'Error');
        console.error('   ❌ Mensagem:', error.message);

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        throw error;
    }
}

/**
 * Deletar imagem do Firebase Storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    try {
        // Se for base64 (legado), não faz nada
        if (imageUrl.startsWith('data:')) {
            return;
        }

        console.log('🗑️ [DELETE] Iniciando deleção da imagem...');

        // Extrair o caminho do arquivo da URL do Firebase Storage
        // Exemplo: https://firebasestorage.googleapis.com/.../o/blog%2Ffilename.png?alt=media
        const storagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);
        const storageRef = ref(storage, storagePath);

        await deleteObject(storageRef);
        console.log('✅ [DELETE] Imagem removida com sucesso');
    } catch (error) {
        console.error('❌ [ERRO] Falha ao deletar imagem:', error);
    }
}

