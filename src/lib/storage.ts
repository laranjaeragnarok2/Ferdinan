import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

/**
 * Upload de imagem convertida para base64 e salva no Firestore
 * Não usa Firebase Storage (pago), usa Firestore Database (gratuito)
 */
export async function uploadImage(file: File): Promise<string> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 [UPLOAD] Iniciando processo de upload (Base64)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        // 1. Validar Firestore
        console.log('📋 [STEP 1] Validando Firestore Database...');
        if (!db) {
            console.error('❌ [ERRO] Firestore não inicializado!');
            throw new Error('Firestore Database não foi inicializado. Verifique as variáveis de ambiente.');
        }
        console.log('✅ [STEP 1] Firestore inicializado com sucesso');

        // 2. Validar tamanho (Firestore tem limite de 1MB por documento)
        console.log('\n📋 [STEP 2] Validando tamanho do arquivo...');
        const maxSize = 800 * 1024; // 800KB (deixando margem para o base64 que aumenta ~33%)
        if (file.size > maxSize) {
            console.error('❌ [ERRO] Arquivo muito grande:', (file.size / 1024).toFixed(2), 'KB');
            throw new Error(`Arquivo muito grande. Máximo: 800KB. Tamanho atual: ${(file.size / 1024).toFixed(2)}KB`);
        }
        console.log('✅ [STEP 2] Tamanho validado');
        console.log('   📁 Arquivo:', file.name);
        console.log('   📏 Tamanho:', (file.size / 1024).toFixed(2), 'KB');
        console.log('   🎨 Tipo:', file.type);

        // 3. Converter para base64
        console.log('\n📋 [STEP 3] Convertendo para base64...');
        const base64 = await fileToBase64(file);
        console.log('✅ [STEP 3] Conversão concluída');
        console.log('   📊 Tamanho base64:', (base64.length / 1024).toFixed(2), 'KB');

        // 4. Salvar no Firestore
        console.log('\n📋 [STEP 4] Salvando no Firestore...');
        const timestamp = Date.now();
        const imageDoc = await addDoc(collection(db, 'blog-images'), {
            data: base64,
            filename: file.name,
            contentType: file.type,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            timestamp: timestamp,
        });
        console.log('✅ [STEP 4] Imagem salva no Firestore');
        console.log('   🆔 Document ID:', imageDoc.id);

        // 5. Retornar a string base64 como data URL
        const dataUrl = base64;
        console.log('✅ [STEP 5] Data URL gerada');

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 [SUCESSO] Upload finalizado com sucesso!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        return dataUrl;
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
