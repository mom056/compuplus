import { Metadata } from 'next';
import { SERVICES } from '@/constants';
import ServicePageContent from '@/components/ServicePage';

// Generate static params for all services
export async function generateStaticParams() {
    const services = SERVICES('en');
    return services.map((service) => ({
        slug: service.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const services = SERVICES('en');
    const service = services.find(s => s.slug === slug);

    if (!service) {
        return {
            title: 'Service Not Found | CompuPlus',
        };
    }

    return {
        title: `${service.title} | CompuPlus`,
        description: service.metaDescription,
        openGraph: {
            title: `${service.title} | CompuPlus`,
            description: service.metaDescription,
            type: 'website',
            locale: 'en_US',
            alternateLocale: 'ar_EG',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.title} | CompuPlus`,
            description: service.metaDescription,
        },
        alternates: {
            canonical: `https://compuplus.cc/services/${slug}`,
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ServicePageContent slug={slug} />;
}
