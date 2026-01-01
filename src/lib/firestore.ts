import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from '@/types/blog';

const POSTS_COLLECTION = 'blog-posts';

// Função helper para converter slug
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/-+/g, '-') // Remove hífens duplicados
        .trim();
}

// Criar novo post
export async function createPost(input: CreateBlogPostInput): Promise<BlogPost> {
    const now = new Date().toISOString();
    const slug = generateSlug(input.title);

    const postData = {
        ...input,
        slug,
        publishedAt: now,
        updatedAt: now,
    };

    const docRef = await addDoc(collection(db, POSTS_COLLECTION), postData);

    return {
        id: docRef.id,
        ...postData,
    };
}

// Buscar todos os posts (com filtros opcionais)
export async function getPosts(options?: {
    published?: boolean;
    tag?: string;
    searchQuery?: string;
    limitCount?: number;
}): Promise<BlogPost[]> {
    const postsRef = collection(db, POSTS_COLLECTION);
    let q = query(postsRef, orderBy('publishedAt', 'desc'));

    if (options?.published !== undefined) {
        q = query(q, where('published', '==', options.published));
    }

    if (options?.tag) {
        q = query(q, where('tags', 'array-contains', options.tag));
    }

    if (options?.limitCount) {
        q = query(q, limit(options.limitCount));
    }

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as BlogPost[];

    // Filtro de busca no lado do cliente (Firestore não tem full-text search nativo)
    if (options?.searchQuery) {
        const searchLower = options.searchQuery.toLowerCase();
        return posts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchLower) ||
                post.description.toLowerCase().includes(searchLower)
        );
    }

    return posts;
}

// Buscar post por slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];
    return {
        id: doc.id,
        ...doc.data(),
    } as BlogPost;
}

// Buscar post por ID
export async function getPostById(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, POSTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    return {
        id: docSnap.id,
        ...docSnap.data(),
    } as BlogPost;
}

// Atualizar post
export async function updatePost(input: UpdateBlogPostInput): Promise<void> {
    const { id, ...updateData } = input;
    const docRef = doc(db, POSTS_COLLECTION, id);

    // Atualizar slug se o título mudou
    const dataToUpdate: any = { ...updateData };
    if (updateData.title) {
        dataToUpdate.slug = generateSlug(updateData.title);
    }

    await updateDoc(docRef, {
        ...dataToUpdate,
        updatedAt: new Date().toISOString(),
    });
}

// Deletar post
export async function deletePost(id: string): Promise<void> {
    const docRef = doc(db, POSTS_COLLECTION, id);
    await deleteDoc(docRef);
}

// Buscar todas as tags únicas
export async function getAllTags(): Promise<string[]> {
    const posts = await getPosts({ published: true });
    const tagsSet = new Set<string>();

    posts.forEach((post) => {
        post.tags?.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
}
