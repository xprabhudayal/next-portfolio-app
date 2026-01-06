
import type { Metadata } from 'next';
import LinksClient from './LinksClient';

export const metadata: Metadata = {
    title: 'Links',
    description: 'Connect with Prabhudayal Vaishnav across social media and other platforms.',
    openGraph: {
        title: 'Links // PRABHUDAYAL VAISHNAV',
        description: 'Connect with Prabhudayal Vaishnav across social media and other platforms.',
    },
};

export default function LinksPage() {
    return <LinksClient />;
}
