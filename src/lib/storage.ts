import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import imageCompression from 'browser-image-compression';

/**
 * Comprimir e fazer upload de imagem para o Firestore como base64
 * Aceita imagens grandes e comprime automaticamente para otimização web/SEO
 */
export async function uploadImage(file: File): Promise<string> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 [UPLOAD] Iniciando processo de upload com compressão');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        // 1. Validar Firestore
        console.log('📋 [STEP 1] Validando Firestore Database...');
        if (!db) {
            console.error('❌ [ERRO] Firestore não inicializado!');
            throw new Error('Firestore Database não foi inicializado. Verifique as variáveis de ambiente.');
        }
        console.log('✅ [STEP 1] Firestore inicializado com sucesso');

        // 2. Log da imagem original
        console.log('\n📋 [STEP 2] Analisando imagem original...');
        console.log('   📁 Arquivo:', file.name);
        console.log('   📏 Tamanho original:', (file.size / 1024 / 1024).toFixed(2), 'MB');
        console.log('   🎨 Tipo:', file.type);

        // 3. Comprimir imagem
        console.log('\n📋 [STEP 3] Comprimindo imagem...');
        console.log('   🎯 Objetivo: Máximo 700KB para Firestore');
        console.log('   🔧 Otimizando para web/SEO...');

        const options = {
            maxSizeMB: 0.7, // 700KB - deixa margem para base64
            maxWidthOrHeight: 1920, // Máximo 1920px (Full HD)
            useWebWorker: true,
            fileType: 'image/webp', // WebP é mais eficiente
        };

        const compressedFile = await imageCompression(file, options);

        console.log('✅ [STEP 3] Compressão concluída!');
        console.log('   📏 Tamanho original:', (file.size / 1024).toFixed(2), 'KB');
        console.log('   📏 Tamanho comprimido:', (compressedFile.size / 1024).toFixed(2), 'KB');
        console.log('   💾 Redução:', ((1 - compressedFile.size / file.size) * 100).toFixed(1), '%');
        console.log('   🎨 Formato:', compressedFile.type);

        // 4. Validar tamanho após compressão
        console.log('\n📋 [STEP 4] Validando tamanho...');
        const maxSize = 800 * 1024; // 800KB
        if (compressedFile.size > maxSize) {
            console.warn('⚠️ [AVISO] Imagem ainda muito grande após compressão');
            console.warn('   📏 Tamanho:', (compressedFile.size / 1024).toFixed(2), 'KB');
            console.warn('   🎯 Máximo:', (maxSize / 1024).toFixed(2), 'KB');
            throw new Error(`Imagem muito grande mesmo após compressão. Tamanho: ${(compressedFile.size / 1024).toFixed(2)}KB. Tente uma imagem menor ou com menos detalhes.`);
        }
        console.log('✅ [STEP 4] Tamanho validado');

        // 5. Converter para base64
        console.log('\n📋 [STEP 5] Convertendo para base64...');
        const base64 = await fileToBase64(compressedFile);
        console.log('✅ [STEP 5] Conversão concluída');
        console.log('   📊 Tamanho base64:', (base64.length / 1024).toFixed(2), 'KB');

        // 6. Salvar no Firestore
        console.log('\n📋 [STEP 6] Salvando no Firestore...');
        const timestamp = Date.now();
        const imageDoc = await addDoc(collection(db, 'blog-images'), {
            data: base64,
            filename: file.name,
            originalSize: file.size,
            compressedSize: compressedFile.size,
            contentType: compressedFile.type,
            uploadedAt: new Date().toISOString(),
            timestamp: timestamp,
        });
        console.log('✅ [STEP 6] Imagem salva no Firestore');
        console.log('   🆔 Document ID:', imageDoc.id);

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 [SUCESSO] Upload finalizado com sucesso!');
        console.log('   📊 Estatísticas:');
        console.log('   • Original:', (file.size / 1024).toFixed(2), 'KB');
        console.log('   • Comprimido:', (compressedFile.size / 1024).toFixed(2), 'KB');
        console.log('   • Economia:', ((1 - compressedFile.size / file.size) * 100).toFixed(1), '%');
        console.log('   • Formato:', compressedFile.type);
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
