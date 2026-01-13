/**
 * Converte um arquivo em string Base64 para salvar direto no Firestore Database
 */
export async function uploadImage(file: File): Promise<string> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 [UPLOAD] Convertendo imagem para Base64 (Firestore Mode)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result as string;
            console.log('✅ [UPLOAD] Conversão concluída');
            console.log('📏 Tamanho final da string:', (base64String.length / 1024).toFixed(2), 'KB');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            resolve(base64String);
        };

        reader.onerror = (error) => {
            console.error('❌ [ERRO] Falha ao ler arquivo:', error);
            reject(new Error('Falha ao converter imagem para salvar no banco.'));
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Função mantida apenas por compatibilidade (não faz nada no modo Firestore)
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    console.log('ℹ️ [DELETE] Imagem em Base64 será removida automaticamente ao deletar o documento.');
}

