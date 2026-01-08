import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    titleAr: string;
    date: string;
    author: string;
    excerpt: string;
    excerptAr: string;
    tags: string[];
    coverImage: string;
    content: string;
    contentAr: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            return getPostBySlug(slug);
        })
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || '',
            titleAr: data.titleAr || data.title || '',
            date: data.date || '',
            author: data.author || 'CompuPlus Team',
            excerpt: data.excerpt || '',
            excerptAr: data.excerptAr || data.excerpt || '',
            tags: data.tags || [],
            coverImage: data.coverImage || '/blog/default-cover.jpg',
            content: content,
            contentAr: data.contentAr || content,
        };
    } catch {
        return null;
    }
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagsSet = new Set<string>();

    posts.forEach(post => {
        post.tags.forEach(tag => tagsSet.add(tag));
    });

    return Array.from(tagsSet);
}

export function getPostsByTag(tag: string): BlogPost[] {
    return getAllPosts().filter(post => post.tags.includes(tag));
}
