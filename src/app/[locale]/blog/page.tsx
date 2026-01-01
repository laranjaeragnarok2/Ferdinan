'use client';

import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';
import BlogCard from '@/components/blog/BlogCard';
import BlogFilters from '@/components/blog/BlogFilters';
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [availableTags, setAvailableTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Buscar posts
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('/api/blog/posts?published=true');
                const data = await response.json();
                setPosts(data.posts);
                setFilteredPosts(data.posts);

                // Extrair tags únicas
                const tags = new Set<string>();
                data.posts.forEach((post: BlogPost) => {
                    post.tags.forEach((tag) => tags.add(tag));
                });
                setAvailableTags(Array.from(tags).sort());
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    // Aplicar filtros
    useEffect(() => {
        let filtered = [...posts];

        // Filtrar por tags
        if (selectedTags.length > 0) {
            filtered = filtered.filter((post) =>
                selectedTags.some((tag) => post.tags.includes(tag))
            );
        }

        // Filtrar por busca
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.description.toLowerCase().includes(query)
            );
        }

        setFilteredPosts(filtered);
    }, [posts, selectedTags, searchQuery]);

    const handleTagToggle = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleClearFilters = () => {
        setSelectedTags([]);
        setSearchQuery('');
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                    <div className="container mx-auto max-w-7xl relative z-10">
                        <FadeInOnScroll>
                            <div className="text-center space-y-4">
                                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                    Blog
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Insights, estratégias e tendências sobre Growth, AI e automação
                                </p>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* Filtros e Posts */}
                <section className="py-12 px-4">
                    <div className="container mx-auto max-w-7xl">
                        <FadeInOnScroll>
                            <BlogFilters
                                availableTags={availableTags}
                                selectedTags={selectedTags}
                                searchQuery={searchQuery}
                                onTagToggle={handleTagToggle}
                                onSearchChange={setSearchQuery}
                                onClearFilters={handleClearFilters}
                            />
                        </FadeInOnScroll>

                        {/* Grid de posts */}
                        <div className="mt-12">
                            {loading ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Carregando posts...</p>
                                </div>
                            ) : filteredPosts.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">
                                        {searchQuery || selectedTags.length > 0
                                            ? 'Nenhum post encontrado com os filtros selecionados.'
                                            : 'Nenhum post publicado ainda.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredPosts.map((post) => (
                                        <FadeInOnScroll key={post.id}>
                                            <BlogCard post={post} />
                                        </FadeInOnScroll>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
