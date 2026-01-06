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
import { useCallback, useRef, useState } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                // Desabilitar o Link do StarterKit para usar nossa configuração customizada
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

    const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        console.log('🔍 [Upload] Iniciando processo de upload');
        console.log('📁 [Upload] Arquivo selecionado:', file?.name, file?.type, `${(file?.size || 0) / 1024}KB`);

        if (!file || !editor) {
            console.warn('⚠️ [Upload] Arquivo ou editor não disponível');
            return;
        }

        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            console.error('❌ [Upload] Tipo de arquivo inválido:', file.type);
            alert('Tipo de arquivo inválido. Apenas imagens são permitidas.');
            return;
        }

        // Validar tamanho (máximo 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            console.error('❌ [Upload] Arquivo muito grande:', `${file.size / 1024 / 1024}MB`);
            alert('Arquivo muito grande. O tamanho máximo é 5MB.');
            return;
        }

        console.log('✅ [Upload] Validações passaram, iniciando upload...');
        setIsUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            console.log('📤 [Upload] Enviando requisição para /api/blog/upload');

            const response = await fetch('/api/blog/upload', {
                method: 'POST',
                body: formData,
            });

            console.log('📥 [Upload] Resposta recebida:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('❌ [Upload] Erro na resposta:', error);
                throw new Error(error.error || 'Falha ao fazer upload da imagem');
            }

            const data = await response.json();
            console.log('✅ [Upload] Upload bem-sucedido!', data);

            if (data.url) {
                console.log('🖼️ [Upload] Inserindo imagem no editor:', data.url);
                editor.chain().focus().setImage({ src: data.url }).run();
                console.log('✅ [Upload] Imagem inserida com sucesso!');
            } else {
                console.error('❌ [Upload] URL não retornada na resposta');
                throw new Error('URL da imagem não foi retornada');
            }
        } catch (error) {
            console.error('❌ [Upload] Erro capturado:', error);

            // Log detalhado do erro
            if (error instanceof Error) {
                console.error('❌ [Upload] Mensagem:', error.message);
                console.error('❌ [Upload] Stack:', error.stack);
            }

            alert(error instanceof Error ? error.message : 'Erro ao fazer upload da imagem');
        } finally {
            setIsUploadingImage(false);
            console.log('🏁 [Upload] Processo finalizado');

            // Limpar o input para permitir upload do mesmo arquivo novamente
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [editor]);

    const addImage = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

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
