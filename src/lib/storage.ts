import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

/**
 * Upload de imagem para o Firestore como base64
 * A compressão já foi feita no client-side antes de chegar aqui
 */
export async function uploadImage(file: File): Promise<string> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 [UPLOAD] Processando imagem comprimida');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        // 1. Validar Firestore
        console.log('📋 [STEP 1] Validando Firestore Database...');
        if (!db) {
            console.error('❌ [ERRO] Firestore não inicializado!');
            throw new Error('Firestore Database não foi inicializado. Verifique as variáveis de ambiente.');
        }
        console.log('✅ [STEP 1] Firestore inicializado com sucesso');

        // 2. Log da imagem (já comprimida)
        console.log('\n📋 [STEP 2] Analisando imagem...');
        console.log('   📁 Arquivo:', file.name);
        console.log('   📏 Tamanho:', (file.size / 1024).toFixed(2), 'KB');
        console.log('   🎨 Tipo:', file.type);

        // 3. Validar tamanho (deve estar ~700KB após compressão)
        console.log('\n📋 [STEP 3] Validando tamanho...');
        const maxSize = 800 * 1024; // 800KB
        if (file.size > maxSize) {
            console.warn('⚠️ [AVISO] Imagem maior que o esperado');
            console.warn('   📏 Tamanho:', (file.size / 1024).toFixed(2), 'KB');
            console.warn('   🎯 Máximo:', (maxSize / 1024).toFixed(2), 'KB');
            throw new Error(`Imagem muito grande. Tamanho: ${(file.size / 1024).toFixed(2)}KB. A compressão pode ter falhado.`);
        }
        console.log('✅ [STEP 3] Tamanho validado');

        // 4. Converter para base64
        console.log('\n📋 [STEP 4] Convertendo para base64...');
        const base64 = await fileToBase64(file);
        console.log('✅ [STEP 4] Conversão concluída');
        console.log('   📊 Tamanho base64:', (base64.length / 1024).toFixed(2), 'KB');

        // 5. Salvar no Firestore
        console.log('\n📋 [STEP 5] Salvando no Firestore...');
        const timestamp = Date.now();
        const imageDoc = await addDoc(collection(db, 'blog-images'), {
            data: base64,
            filename: file.name,
            size: file.size,
            contentType: file.type,
            uploadedAt: new Date().toISOString(),
            timestamp: timestamp,
        });
        console.log('✅ [STEP 5] Imagem salva no Firestore');
        console.log('   🆔 Document ID:', imageDoc.id);

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 [SUCESSO] Upload finalizado com sucesso!');
        console.log('   📊 Estatísticas:');
        console.log('   • Tamanho:', (file.size / 1024).toFixed(2), 'KB');
        console.log('   • Formato:', file.type);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        return base64;
    } catch (error: any) {
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('💥 [ERRO] Falha no upload!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        console.error('📋 Detalhes do erro:');
        console.error('   ❌ Tipo:', error.constructor.name);
        console.error('   ❌ Mensagem:', error.message);
        console.error('   ❌ Stack:', error.stack);

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        throw error;
    }
}

/**
 * Converter File para base64 data URL
 */
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

/**
 * Deletar imagem do Firestore (não implementado - base64 fica no documento do post)
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    try {
        // Se for base64, não precisa deletar (está embutido no post)
        if (imageUrl.startsWith('data:')) {
            return;
        }

        console.log('⚠️ [DELETE] Imagem não é base64, ignorando...');
    } catch (error) {
        console.error('Erro ao deletar imagem:', error);
    }
}
