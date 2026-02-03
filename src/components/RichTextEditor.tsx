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
    Loader2,
} from 'lucide-react';
import { useCallback, useRef, useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const [isSourceMode, setIsSourceMode] = useState(false);
    const [sourceContent, setSourceContent] = useState('');
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                link: false,
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
        content: content, // Initial content
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[400px] max-w-none p-4',
            },
        },
        onUpdate: ({ editor }) => {
            if (!isSourceMode) {
                onChange(editor.getHTML());
            }
        },
    });

    // Sync content updates from parent if strictly necessary (careful with loops)
    // For now, relying on initial content and internal state.

    const toggleSourceMode = useCallback(() => {
        if (!editor) return;

        if (isSourceMode) {
            // Exiting source mode: update editor content from textarea
            try {
                editor.commands.setContent(sourceContent);
                // Trigger change to parent
                onChange(sourceContent);
            } catch (e) {
                console.error('Error setting content from source:', e);
            }
            setIsSourceMode(false);
        } else {
            // Entering source mode: get HTML from editor
            const html = editor.getHTML() || '';
            setSourceContent(html);
            setIsSourceMode(true);
        }
    }, [editor, isSourceMode, sourceContent, onChange]);

    const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        setSourceContent(newVal);
        onChange(newVal);
    };

    const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!editor) return;

        const file = event.target.files?.[0];
        if (!file) return;

        console.log('🔍 [Upload] Iniciando processo de upload');

        // Verifica tipo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            alert('Tipo de arquivo inválido.');
            return;
        }

        setIsUploadingImage(true);

        try {
            const options = {
                maxSizeMB: 0.7,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: 'image/webp',
            };

            const compressedFile = await imageCompression(file, options);
            const formData = new FormData();
            formData.append('file', compressedFile);

            const response = await fetch('/api/blog/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Falha no upload');

            const data = await response.json();

            if (data.url) {
                editor.chain().focus().setImage({ src: data.url }).run();
            }
        } catch (error) {
            console.error('❌ [Upload] Erro:', error);
            alert('Erro ao fazer upload da imagem');
        } finally {
            setIsUploadingImage(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    }, [editor]);

    const addImage = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL do link:', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    // Safety check: Don't render anything until editor is ready
    if (!editor) {
        return <div className="p-4 text-muted-foreground">Inicializando editor...</div>;
    }

    return (
        <div className="border border-border/50 rounded-lg overflow-hidden bg-background">
            {/* Toolbar */}
            <div className="border-b border-border/50 bg-muted/30 p-2 flex flex-wrap gap-1">
                {/* Source Mode Toggle */}
                <div className="flex gap-1 border-r border-border/50 pr-2">
                    <Button
                        type="button"
                        variant={isSourceMode ? 'default' : 'ghost'}
                        size="sm"
                        onClick={toggleSourceMode}
                        title="Ver Código Fonte (HTML)"
                    >
                        <Code2 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Hide other controls when in Source Mode */}
                {!isSourceMode && (
                    <>
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
                                disabled={isUploadingImage}
                                title="Adicionar Imagem"
                            >
                                {isUploadingImage ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <ImageIcon className="h-4 w-4" />
                                )}
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
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
                    </>
                )}
            </div>

            {/* Editor Area */}
            {isSourceMode ? (
                <textarea
                    value={sourceContent}
                    onChange={handleSourceChange}
                    className="w-full min-h-[400px] p-4 font-mono text-sm bg-muted/20 focus:outline-none resize-y text-foreground"
                    placeholder="HTML Source Code..."
                />
            ) : (
                <EditorContent editor={editor} className="bg-background" />
            )}

            {/* Footer Info */}
            <div className="border-t border-border/50 bg-muted/30 px-4 py-2 text-xs text-muted-foreground flex justify-between">
                <span>
                    {editor && editor.storage.characterCount ? editor.storage.characterCount.characters() : 0} caracteres •{' '}
                    {editor && editor.storage.characterCount ? editor.storage.characterCount.words() : 0} palavras
                </span>
                {isSourceMode && <span className="text-amber-500">Modo de Edição HTML</span>}
            </div>
        </div>
    );
}
