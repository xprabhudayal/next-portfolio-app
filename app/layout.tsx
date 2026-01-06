import './globals.css';
import type { Metadata } from 'next';
import { Oswald, Courier_Prime } from 'next/font/google';
import ClientLayout from '../components/ClientLayout';

// Bold, condensed font for headings
const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald',
    display: 'swap',
});

// Raw, typewriter font for body
const courier = Courier_Prime({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-courier',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'PRABHUDAYAL VAISHNAV // DEV',
        template: '%s // PRABHUDAYAL VAISHNAV',
    },
    description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
    keywords: ['AI Engineer', 'Full Stack Developer', 'React', 'Next.js', 'Typescript', 'Prabhudayal Vaishnav'],
    authors: [{ name: 'Prabhudayal Vaishnav' }],
    creator: 'Prabhudayal Vaishnav',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://prabhudayal.com',
        title: 'PRABHUDAYAL VAISHNAV // DEV',
        description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
        siteName: 'Prabhudayal Vaishnav Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PRABHUDAYAL VAISHNAV // DEV',
        description: 'AI Engineer & Full-Stack Developer building intelligent systems.',
        creator: '@prabhudayal_ai',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${oswald.variable} ${courier.variable} font-mono bg-background text-foreground`}>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
