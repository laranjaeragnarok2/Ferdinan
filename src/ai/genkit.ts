import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Verificar se a API key está configurada
const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ GOOGLE_GENAI_API_KEY not configured. AI chat will not work.');
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: apiKey || 'AIzaSyAYS1IIt9Pc1_zoXRaGsv-u4sVdVN8vxbQ' // Fallback temporário
  })],
  model: 'googleai/gemini-pro', // Modelo correto disponível
});
