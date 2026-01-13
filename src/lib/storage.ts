/**
 * Converte um arquivo em string Base64 para salvar direto no Firestore Database
 * Versão compatível com o Servidor (Node.js)
 */
export async function uploadImage(file: File): Promise<string> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 [UPLOAD] Convertendo imagem para Base64 (Node.js Server Mode)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        // No servidor usamos arrayBuffer e Buffer, pois FileReader só existe no navegador
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

        console.log('✅ [UPLOAD] Conversão concluída');
        console.log('📏 Tamanho final da string:', (base64String.length / 1024).toFixed(2), 'KB');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        return base64String;
    } catch (error) {
        console.error('❌ [ERRO] Falha ao processar arquivo no servidor:', error);
        throw new Error('Falha ao converter imagem para salvar no banco.');
    }
}

/**
 * Função mantida apenas por compatibilidade (não faz nada no modo Firestore)
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    console.log('ℹ️ [DELETE] Imagem em Base64 será removida automaticamente ao deletar o documento.');
}

