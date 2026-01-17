import type { Metadata, Viewport } from 'next';
import { Inter, Cairo, Fira_Code } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Footer from '@/components/Footer';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import GlobalNavbar from '@/components/GlobalNavbar';
import Link from 'next/link';
import ClientBackgrounds from '@/components/ClientBackgrounds';
import ScrollProgress from '@/components/ScrollProgress';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo', display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code', display: 'swap' });

export const metadata: Metadata = {
    title: 'CompuPlus | Engineering the Future',
    description: 'A unified technology powerhouse providing turnkey solutions: Network Infrastructure, Odoo ERP Implementation, Custom Software, and Security Systems.',
    keywords: 'CompuPlus, Networking, Odoo ERP, Software Development, Data Centers, CCTV, Egypt, Tech Solutions',
    openGraph: {
        type: 'website',
        url: 'https://compuplus.com/',
        title: 'CompuPlus | Integrated Tech Solutions',
        description: 'From complex Cabling & Data Centers to advanced Odoo ERP & Mobile Apps. We are your complete technology partner.',
        images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CompuPlus | Integrated Tech Solutions',
        description: 'From complex Cabling & Data Centers to advanced Odoo ERP & Mobile Apps. We are your complete technology partner.',
        images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'],
    },
    icons: {
        icon: '/logo.png',
        apple: '/logo.png',
    },
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'CompuPlus',
    },
    formatDetection: {
        telephone: true,
    },
};

export const viewport: Viewport = {
    themeColor: '#00E5FF',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // JSON-LD Structured Data for Organization
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CompuPlus',
        url: 'https://compuplus.cc',
        logo: 'https://compuplus.cc/logo.png',
        description: 'A unified technology powerhouse providing turnkey solutions: Network Infrastructure, Odoo ERP Implementation, Custom Software, and Security Systems.',
        foundingDate: '1997',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Cairo',
            addressCountry: 'Egypt'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+20-2-2272-8010',
            contactType: 'customer service',
            availableLanguage: ['English', 'Arabic']
        },
        sameAs: [
            'https://www.facebook.com/Compuplusc',
            'https://www.linkedin.com/in/raafat-girgis-a4a91674',
            'https://instagram.com/compuplus'
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'IT Services',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP Solutions' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Network Infrastructure' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Security Systems' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud & Hosting' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Smart Automation' } },
            ]
        }
    };

    return (
        <html lang="en" className="scroll-smooth">
            <head>
                {/* Preconnect to critical third-party origins for faster LCP */}
                <link rel="preconnect" href="https://images.unsplash.com" />
                <link rel="dns-prefetch" href="https://images.unsplash.com" />
                <link rel="preconnect" href="https://www.transparenttextures.com" />
                <link rel="dns-prefetch" href="https://www.transparenttextures.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.variable} ${cairo.variable} ${firaCode.variable} font-sans`}>
                <Providers>
                    <main className="min-h-screen text-slate-900 dark:text-slate-200 selection:bg-violet-500/30 selection:text-violet-900 dark:selection:text-cyan-100">
                        {/* Scroll Progress Indicator */}
                        <ScrollProgress />
                        {/* Clientside effects (Background & Chatbot) */}
                        <ClientBackgrounds />

                        {/* Global Navbar - Visible on all pages */}
                        <GlobalNavbar />

                        {/* Component Children (Page Content) */}
                        {children}

                        <Footer />
                        <ServiceWorkerRegistration />
                    </main>
                </Providers>
            </body>
        </html>
    );
}
