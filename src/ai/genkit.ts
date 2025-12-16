import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({
    apiKey: 'AIzaSyAYS1IIt9Pc1_zoXRaGsv-u4sVdVN8vxbQ'
  })],
  model: 'googleai/gemini-2.5-flash',
});
