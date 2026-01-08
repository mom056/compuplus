import { MetadataRoute } from 'next';
import { SERVICES } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://compuplus.cc';
    const services = SERVICES('en');

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ];

    // Dynamic service pages
    const servicePages = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // Blog posts (static for now)
    const blogPosts = [
        {
            url: `${baseUrl}/blog/choosing-erp-system`,
            lastModified: new Date('2024-01-15'),
            changeFrequency: 'yearly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog/network-infrastructure-2024`,
            lastModified: new Date('2024-01-10'),
            changeFrequency: 'yearly' as const,
            priority: 0.7,
        },
    ];

    return [...staticPages, ...servicePages, ...blogPosts];
}
