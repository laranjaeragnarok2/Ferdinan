import { defineField, defineType } from 'sanity'

export const category = defineType({
    name: 'category',
    title: 'Categoria',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Descrição',
            type: 'text',
        }),
    ],
})
