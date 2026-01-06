import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Upload de imagem para o Firebase Storage
 * Substitui o salvamento local para funcionar na Vercel (disco somente-leitura)
 */
export async function uploadImage(file: File): Promise<string> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 [UPLOAD] Iniciando processo de upload');
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
        console.log('   🔑 Project ID:', storage.app.options.projectId);

        // 2. Gerar nome do arquivo
        console.log('\n📋 [STEP 2] Gerando nome do arquivo...');
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const extension = file.name.split('.').pop();
        const filename = `blog/${timestamp}-${randomString}.${extension}`;
        console.log('✅ [STEP 2] Nome gerado:', filename);
        console.log('   📁 Arquivo original:', file.name);
        console.log('   📏 Tamanho:', (file.size / 1024).toFixed(2), 'KB');
        console.log('   🎨 Tipo:', file.type);

        // 3. Criar referência
        console.log('\n📋 [STEP 3] Criando referência no Storage...');
        const storageRef = ref(storage, filename);
        console.log('✅ [STEP 3] Referência criada');
        console.log('   🔗 Full path:', storageRef.fullPath);
        console.log('   📦 Bucket:', storageRef.bucket);

        // 4. Converter arquivo
        console.log('\n📋 [STEP 4] Convertendo arquivo para bytes...');
        const bytes = await file.arrayBuffer();
        console.log('✅ [STEP 4] Arquivo convertido');
        console.log('   📊 Bytes:', bytes.byteLength);

        // 5. Fazer upload
        console.log('\n📋 [STEP 5] Fazendo upload para Firebase Storage...');
        console.log('   ⏳ Aguarde...');
        const uploadResult = await uploadBytes(storageRef, new Uint8Array(bytes));
        console.log('✅ [STEP 5] Upload concluído com sucesso!');
        console.log('   📦 Bucket:', uploadResult.ref.bucket);
        console.log('   📁 Path:', uploadResult.ref.fullPath);
        console.log('   📊 Metadata:', uploadResult.metadata);

        // 6. Obter URL pública
        console.log('\n📋 [STEP 6] Obtendo URL pública...');
        const downloadURL = await getDownloadURL(storageRef);
        console.log('✅ [STEP 6] URL gerada com sucesso!');
        console.log('   🔗 URL:', downloadURL);

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 [SUCESSO] Upload finalizado com sucesso!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        return downloadURL;
    } catch (error: any) {
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('💥 [ERRO] Falha no upload!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // Log detalhado do erro
        console.error('📋 Detalhes do erro:');
        console.error('   ❌ Tipo:', error.constructor.name);
        console.error('   ❌ Mensagem:', error.message);
        console.error('   ❌ Code:', error.code);
        console.error('   ❌ Status:', error.status_);
        console.error('   ❌ ServerResponse:', error.serverResponse);
        console.error('   ❌ CustomData:', JSON.stringify(error.customData, null, 2));
        console.error('   ❌ Stack:', error.stack);

        // Diagnóstico específico
        console.log('\n🔍 Diagnóstico:');
        if (error.code === 'storage/unknown' && error.status_ === 404) {
            console.error('   ⚠️ ERRO 404: Bucket não encontrado!');
            console.error('   💡 Possíveis causas:');
            console.error('      1. Firebase Storage não está ativado no Console');
            console.error('      2. Variável NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET está incorreta');
            console.error('      3. Bucket:', storage.app.options.storageBucket);
            console.error('   🔧 Solução:');
            console.error('      - Verifique se o Storage está ativado em: https://console.firebase.google.com/');
            console.error('      - Compare o bucket acima com o valor no Firebase Console');
        } else if (error.code === 'storage/unauthorized') {
            console.error('   ⚠️ ERRO: Sem permissão para upload!');
            console.error('   💡 Causa: Regras de segurança bloqueando');
            console.error('   🔧 Solução: Ajuste as regras no Firebase Console > Storage > Rules');
        } else if (error.code === 'storage/unauthenticated') {
            console.error('   ⚠️ ERRO: Não autenticado!');
            console.error('   💡 Causa: Usuário não está logado');
            console.error('   🔧 Solução: Faça login novamente');
        } else {
            console.error('   ⚠️ ERRO DESCONHECIDO');
            console.error('   💡 Revise os logs acima para mais detalhes');
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Mensagens de erro amigáveis
        if (error.code === 'storage/unauthorized') {
            throw new Error('Sem permissão para fazer upload. Verifique as regras do Firebase Storage.');
        }
        if (error.code === 'storage/unauthenticated') {
            throw new Error('Usuário não autenticado. Faça login novamente.');
        }
        if (error.code === 'storage/quota-exceeded') {
            throw new Error('Cota de armazenamento excedida.');
        }
        if (error.code === 'storage/unknown' && error.status_ === 404) {
            throw new Error(`Bucket não encontrado (404). Bucket configurado: ${storage.app.options.storageBucket}. Verifique se o Firebase Storage está ativado e se a variável NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET está correta.`);
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
