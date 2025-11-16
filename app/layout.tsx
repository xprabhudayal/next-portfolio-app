// app/layout.tsx
import './globals.css';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: 'Prabhudayal Vaishnav - AI Engineer & Full-Stack Developer',
  description: 'Portfolio of Prabhudayal Vaishnav - AI Engineer, Full-Stack Developer, and Research Intern at ESIEA Paris',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}