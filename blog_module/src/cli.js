#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import slugify from 'slugify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Path to the blog content in the main app
const BLOG_DIR = path.join(__dirname, '..', '..', 'src', 'content', 'blog');

const program = new Command();

program
    .name('blog-tool')
    .description('Automate blog post creation for Ferdinan')
    .version('1.0.0');

program
    .command('add')
    .description('Add a new blog post')
    .argument('<title>', 'Post title')
    .requiredOption('-d, --description <desc>', 'Post description')
    .option('-t, --tags <tags>', 'Comma-separated tags', 'Ai, Technology')
    .option('-i, --image <url>', 'Cover image path', '/blog-images/default.webp')
    .requiredOption('-c, --content <content>', 'Post content in Markdown/HTML')
    .action((title, options) => {
        try {
            if (!fs.existsSync(BLOG_DIR)) {
                fs.mkdirSync(BLOG_DIR, { recursive: true });
            }

            const slug = slugify(title, { lower: true, strict: true, locale: 'pt' });
            const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

            if (fs.existsSync(filePath)) {
                console.error(`Error: Post with slug "${slug}" already exists!`);
                process.exit(1);
            }

            const now = new Date().toISOString();
            const tags = options.tags.split(',').map(t => t.trim());

            const mdxContent = `---
title: "${title}"
description: "${options.description}"
publishedAt: "${now}"
updatedAt: "${now}"
coverImage: "${options.image}"
tags: ${JSON.stringify(tags)}
published: true
---

${options.content}
`;

            fs.writeFileSync(filePath, mdxContent);
            console.log(`✅ Blog post created: ${filePath}`);
            console.log(`Slug: ${slug}`);
        } catch (err) {
            console.error('Failed to create blog post:', err.message);
            process.exit(1);
        }
    });

program.parse(process.argv);
