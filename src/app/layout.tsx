import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Nutz FRDG — Enterprise Functional Requirements Document Generator',
  description: 'The platform for modern scoping, system architecture, and AI-powered Functional Requirements Document (FRD) generation. Eliminate ambiguity, streamline technical specifications, and export signed executive blueprints.',
  keywords: [
    'Functional Requirements Document',
    'FRD Generator',
    'Software Scoping Platform',
    'Enterprise Architecture Specifications',
    'System Requirements Document',
    'Nutz Technovation',
    'Software Development SLA',
    'Technical Project Scope',
    'AI Requirements Engineering',
  ],
  authors: [{ name: 'Nutz Technovation Private Limited' }],
  creator: 'Nutz Technovation',
  publisher: 'Nutz Technovation Private Limited',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frdg.nutz.in',
    title: 'Nutz FRDG — Enterprise Functional Requirements Document Generator',
    description: 'Eliminate project ambiguity and streamline technical specifications with AI-powered Functional Requirements Document generation.',
    siteName: 'Nutz FRDG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutz FRDG — Enterprise Functional Requirements Document Generator',
    description: 'Eliminate project ambiguity and streamline technical specifications with AI-powered Functional Requirements Document generation.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@400;500;600;700;800;900&family=Sacramento&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#1c1917] antialiased selection:bg-[#aa94ff] selection:text-[#1c1917]">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
