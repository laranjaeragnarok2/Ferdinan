'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogFiltersProps {
    availableTags: string[];
    selectedTags: string[];
    searchQuery: string;
    onTagToggle: (tag: string) => void;
    onSearchChange: (query: string) => void;
    onClearFilters: () => void;
}

export default function BlogFilters({
    availableTags,
    selectedTags,
    searchQuery,
    onTagToggle,
    onSearchChange,
    onClearFilters,
}: BlogFiltersProps) {
    const hasActiveFilters = selectedTags.length > 0 || searchQuery.length > 0;

    return (
        <div className="space-y-6">
            {/* Barra de busca */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar posts..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
                />
            </div>

            {/* Filtros por tags */}
            {availableTags.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">Filtrar por tags:</h3>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClearFilters}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-3 w-3 mr-1" />
                                Limpar filtros
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <Badge
                                    key={tag}
                                    variant={isSelected ? 'default' : 'outline'}
                                    className={`cursor-pointer transition-all ${isSelected
                                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                            : 'hover:bg-primary/10 hover:text-primary hover:border-primary/50'
                                        }`}
                                    onClick={() => onTagToggle(tag)}
                                >
                                    {tag}
                                </Badge>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
