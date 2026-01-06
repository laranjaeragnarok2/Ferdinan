/**
 * Upload de imagem convertendo para base64
 * Salva diretamente no Firestore sem precisar do Firebase Storage
 * Isso resolve o erro 404 e funciona perfeitamente na Vercel
 */
export async function uploadImage(file: File): Promise<string> {
    try {
        console.log(`[Storage] Iniciando conversão para base64: ${file.name}`);

        // Converter arquivo para base64
        const base64 = await fileToBase64(file);

        console.log(`[Storage] Conversão concluída: ${base64.substring(0, 50)}...`);
        console.log(`[Storage] Tamanho da string base64: ${(base64.length / 1024).toFixed(2)}KB`);

        // Retornar a string base64 completa (data URL)
        return base64;
    } catch (error) {
        console.error('[Storage] Erro ao converter imagem:', error);
        throw error;
    }
}

/**
 * Converter File para base64 (data URL)
 */
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Erro ao ler arquivo como base64'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Erro ao ler arquivo'));
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Deletar imagem (não faz nada para base64, pois está inline no documento)
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    // Base64 está inline no documento, não precisa deletar separadamente
    console.log('[Storage] Imagem base64 inline, nada a deletar');
}
