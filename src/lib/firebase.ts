
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebasestorage.app`,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔥 [FIREBASE] Inicializando Firebase...');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Log da configuração
console.log('📋 Configuração do Firebase:');
console.log('   🔑 API Key:', firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 20)}...` : '❌ NÃO CONFIGURADO');
console.log('   🌐 Auth Domain:', firebaseConfig.authDomain || '❌ NÃO CONFIGURADO');
console.log('   📦 Project ID:', firebaseConfig.projectId || '❌ NÃO CONFIGURADO');
console.log('   📁 Storage Bucket:', firebaseConfig.storageBucket || '❌ NÃO CONFIGURADO');
console.log('   🆔 App ID:', firebaseConfig.appId ? `${firebaseConfig.appId.substring(0, 20)}...` : '❌ NÃO CONFIGURADO');

// Validar configuração crítica
const missingVars = [];
if (!firebaseConfig.apiKey) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY');
if (!firebaseConfig.authDomain) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
if (!firebaseConfig.projectId) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
if (!firebaseConfig.storageBucket) missingVars.push('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
if (!firebaseConfig.appId) missingVars.push('NEXT_PUBLIC_FIREBASE_APP_ID');

if (missingVars.length > 0) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ [ERRO] Variáveis de ambiente faltando!');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('📋 Variáveis não configuradas:');
    missingVars.forEach(v => console.error(`   ❌ ${v}`));
    console.error('🔧 Configure estas variáveis na Vercel:');
    console.error('   https://vercel.com/dashboard > Settings > Environment Variables');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// Initialize Firebase (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

console.log('✅ [FIREBASE] Inicializado com sucesso!');
console.log('   📦 Storage Bucket:', storage.app.options.storageBucket);
console.log('   🔑 Project ID:', storage.app.options.projectId);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

export { db, storage };
