export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string; // HTML do TipTap
    coverImage: string;
    author: {
        name: string;
        avatar?: string;
    };
    tags: string[];
    publishedAt: string;
    updatedAt: string;
    published: boolean;
}

export interface CreateBlogPostInput {
    title: string;
    description: string;
    content: string;
    coverImage: string;
    author: {
        name: string;
        avatar?: string;
    };
    tags: string[];
    published: boolean;
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
    id: string;
}
