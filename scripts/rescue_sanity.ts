import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Configuração extraída do seu ambiente
const client = createClient({
    projectId: 'p6denknw', 
    dataset: 'production',
    apiVersion: '2024-02-03',
    useCdn: false,
});

const BLOG_DEST = path.join(process.cwd(), 'src/content/blog');
const IMAGE_DEST = path.join(process.cwd(), 'public/blog-images');

async function downloadImage(url: string, filename: string) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(path.join(IMAGE_DEST, filename), response.data);
    return `/blog-images/${filename}`;
}

async function rescuePosts() {
    console.log('--- Operação Resgate Iniciada ---');
    
    if (!fs.existsSync(BLOG_DEST)) fs.mkdirSync(BLOG_DEST, { recursive: true });
    if (!fs.existsSync(IMAGE_DEST)) fs.mkdirSync(IMAGE_DEST, { recursive: true });

    try {
        const query = `*[_type == "post"] {
            title,
            "slug": slug.current,
            description,
            content,
            "coverImage": coverImage.asset->url,
            publishedAt,
            _updatedAt,
            tags
        }`;

        const posts = await client.fetch(query);
        console.log(`Encontrados ${posts.length} posts no Sanity.`);

        for (const post of posts) {
            let localImagePath = post.coverImage;
            
            if (post.coverImage) {
                const imgExt = post.coverImage.split('.').pop() || 'png';
                const imgName = `${post.slug}.${imgExt}`;
                console.log(`Baixando imagem: ${imgName}`);
                try {
                    localImagePath = await downloadImage(post.coverImage, imgName);
                } catch (e) {
                    console.error(`Falha ao baixar imagem de ${post.slug}`);
                }
            }

            const mdxContent = `---
title: "${post.title}"
description: "${post.description || ''}"
publishedAt: "${post.publishedAt || post._updatedAt}"
updatedAt: "${post._updatedAt}"
coverImage: "${localImagePath || ''}"
tags: ${JSON.stringify(post.tags || [])}
published: true
---

${post.content || ''}
`;

            fs.writeFileSync(path.join(BLOG_DEST, `${post.slug}.mdx`), mdxContent);
            console.log(`Post resgatado: ${post.slug}.mdx`);
        }

        console.log('--- Resgate Concluído com Sucesso ---');
    } catch (error) {
        console.error('ERRO NO RESGATE:', error);
    }
}

rescuePosts();
