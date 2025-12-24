import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // Dar as boas-vindas e facilitar o acesso para bots de IA
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'Googlebot-Extended'],
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'CCBot', // Common Crawl - Geralmente bom para LLMs
        allow: '/',
      }
    ],
    sitemap: 'https://ferdinan-msp.group/sitemap.xml',
  };
}
