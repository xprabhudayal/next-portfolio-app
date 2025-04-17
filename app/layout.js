import './globals.css';

export const metadata = {
  title: 'Your Name - Creative Developer',
  description: 'Personal portfolio showcasing creative development work and professional experience',
  openGraph: {
    title: 'Your Name - Creative Developer',
    description: 'Personal portfolio showcasing creative development work and professional experience',
    url: 'https://yourname.dev',
    siteName: 'Your Name Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name - Creative Developer',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/switzer" rel="stylesheet" />
        <link rel="preload" href="https://fonts.cdnfonts.com/css/switzer" as="style" />
      </head>
      <body className="bg-black text-white font-switzer">
        {children}
      </body>
    </html>
  );
}