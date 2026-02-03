import { defineField, defineType } from 'sanity'

export const post = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Autor',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({
            name: 'coverImage',
            title: 'Imagem de Capa',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'categories',
            title: 'Categorias (Tags)',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Data de Publicação',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'description',
            title: 'Descrição Curta',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.max(300),
        }),
        defineField({
            name: 'body',
            title: 'Conteúdo',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'coverImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})
