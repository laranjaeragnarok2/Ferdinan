'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link2,
    ImageIcon,
    Code2,
    Minus,
} from 'lucide-react';
import { useCallback } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const addImage = useCallback(() => {
        const url = window.prompt('URL da imagem:');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL do link:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-border/50 rounded-lg overflow-hidden bg-background">
            {/* Toolbar */}
            <div className="border-b border-border/50 bg-muted/30 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-border/50 pr-2">
                    <Button
                        type="button"
                        variant={editor.isActive('bold') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        title="Negrito (Ctrl+B)"
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor.isActive('italic') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        title="Itálico (Ctrl+I)"
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor.isActive('strike') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        title="Tachado"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor.isActive('code') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        title="Código Inline"
                    >
                        <Code className="h-4 w-4" />
                    </Button>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-border/50 pr-2">
                    <Button
                        type="button"
                        variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        title="Título 1"
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        title="Título 2"
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        title="Título 3"
                    >
                        <Heading3 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-border/50 pr-2">
                    <Button
                        type="button"
                        variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        title="Lista com Marcadores"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        title="Lista Numerada"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                </div>

                {/* Blocks */}
                <div className="flex gap-1 border-r border-border/50 pr-2">
                    <Button
                        type="button"
                        variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        title="Citação"
                    >
                        <Quote className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        title="Bloco de Código"
                    >
                        <Code2 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        title="Linha Horizontal"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                </div>

                {/* Media */}
                <div className="flex gap-1 border-r border-border/50 pr-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={setLink}
                        title="Adicionar Link"
                    >
                        <Link2 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addImage}
                        title="Adicionar Imagem"
                    >
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                </div>

                {/* History */}
                <div className="flex gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Desfazer (Ctrl+Z)"
                    >
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Refazer (Ctrl+Y)"
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="bg-background" />

            {/* Footer Info */}
            <div className="border-t border-border/50 bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
                <span>
                    {editor.storage.characterCount?.characters() || 0} caracteres •{' '}
                    {editor.storage.characterCount?.words() || 0} palavras
                </span>
            </div>
        </div>
    );
}
