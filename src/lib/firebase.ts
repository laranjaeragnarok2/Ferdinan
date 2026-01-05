
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

// Log da configuração (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
    console.log('🔥 [Firebase] Configuração:', {
        projectId: firebaseConfig.projectId,
        storageBucket: firebaseConfig.storageBucket,
        authDomain: firebaseConfig.authDomain,
    });
}

// Validar configuração crítica
if (!firebaseConfig.storageBucket) {
    console.error('❌ [Firebase] ERRO: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET não está configurado!');
    console.error('❌ [Firebase] Configure a variável de ambiente com o valor correto do Firebase Console');
}

// Initialize Firebase (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

console.log('✅ [Firebase] Inicializado com sucesso');
console.log('📦 [Firebase Storage] Bucket:', storage.app.options.storageBucket);

export { db, storage };
