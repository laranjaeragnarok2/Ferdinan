// Script para testar configuração do Firebase Storage
// Execute: node test-firebase-config.js

console.log('🔍 Testando configuração do Firebase...\n');

// Simular variáveis de ambiente (substitua pelos valores reais)
const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'NÃO CONFIGURADO',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'NÃO CONFIGURADO',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'NÃO CONFIGURADO',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'NÃO CONFIGURADO',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'NÃO CONFIGURADO',
};

console.log('📋 Configuração atual:\n');
console.log('API Key:', config.apiKey === 'NÃO CONFIGURADO' ? '❌ NÃO CONFIGURADO' : '✅ Configurado');
console.log('Auth Domain:', config.authDomain === 'NÃO CONFIGURADO' ? '❌ NÃO CONFIGURADO' : `✅ ${config.authDomain}`);
console.log('Project ID:', config.projectId === 'NÃO CONFIGURADO' ? '❌ NÃO CONFIGURADO' : `✅ ${config.projectId}`);
console.log('Storage Bucket:', config.storageBucket === 'NÃO CONFIGURADO' ? '❌ NÃO CONFIGURADO' : `✅ ${config.storageBucket}`);
console.log('App ID:', config.appId === 'NÃO CONFIGURADO' ? '❌ NÃO CONFIGURADO' : '✅ Configurado');

console.log('\n' + '='.repeat(60) + '\n');

// Verificar se o storageBucket está correto
if (config.storageBucket !== 'NÃO CONFIGURADO') {
    console.log('🔍 Analisando Storage Bucket...\n');

    const bucket = config.storageBucket;

    if (bucket.includes('firebasestorage.app')) {
        console.log('✅ Formato novo detectado:', bucket);
        console.log('   Exemplo: projeto-id.firebasestorage.app');
    } else if (bucket.includes('appspot.com')) {
        console.log('✅ Formato antigo detectado:', bucket);
        console.log('   Exemplo: projeto-id.appspot.com');
    } else {
        console.log('⚠️  Formato não reconhecido:', bucket);
        console.log('   Esperado: projeto-id.appspot.com OU projeto-id.firebasestorage.app');
    }

    if (bucket.startsWith('gs://')) {
        console.log('\n❌ ERRO: O bucket não deve começar com "gs://"');
        console.log('   Remova o prefixo "gs://" da variável de ambiente');
        console.log('   Correto:', bucket.replace('gs://', ''));
    }
} else {
    console.log('❌ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET não está configurado!\n');
    console.log('📝 Para configurar:');
    console.log('   1. Acesse: https://console.firebase.google.com/');
    console.log('   2. Vá em Storage → Começar (se não estiver ativado)');
    console.log('   3. Copie o nome do bucket (sem gs://)');
    console.log('   4. No Vercel: Settings → Environment Variables');
    console.log('   5. Adicione: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-bucket');
    console.log('   6. Redeploy');
}

console.log('\n' + '='.repeat(60) + '\n');

// Diagnóstico final
const allConfigured = Object.values(config).every(v => v !== 'NÃO CONFIGURADO');

if (allConfigured) {
    console.log('✅ Todas as variáveis estão configuradas!');
    console.log('\n📝 Próximos passos:');
    console.log('   1. Certifique-se de que o Firebase Storage está ATIVADO no console');
    console.log('   2. Verifique as regras de segurança do Storage');
    console.log('   3. Teste o upload de uma imagem');
} else {
    console.log('❌ Algumas variáveis estão faltando!');
    console.log('\n📝 Configure todas as variáveis NEXT_PUBLIC_FIREBASE_* no Vercel');
}

console.log('\n' + '='.repeat(60));
