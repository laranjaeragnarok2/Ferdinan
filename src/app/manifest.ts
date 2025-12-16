
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Ferdian MSP - Consultoria de Crescimento',
        short_name: 'Ferdian',
        description: 'Estratégias de crescimento personalizadas, curadas para negócios de alto valor.',
        start_url: '/',
        display: 'standalone',
        background_color: '#09090b', // Cor de fundo dark (combinando com o site)
        theme_color: '#f59e0b', // Cor do tema (Amber-500 usado no site)
        orientation: 'portrait',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icon-512.png', // Fallback icon path (usuário precisará colocar a imagem aqui)
                sizes: '512x512',
                type: 'image/png',
            }
        ],
    };
}
