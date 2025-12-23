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
    title: 'PRABHUDAYAL VAISHNAV // DEV',
    description: 'AI ENGINEER. FULL STACK. NO NONSENSE.',
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
