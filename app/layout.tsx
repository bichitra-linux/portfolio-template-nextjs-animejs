import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://johndoe.dev'),
  title: 'John Doe - Senior Frontend Developer',
  description: 'Passionate Senior Frontend Developer with expertise in modern web technologies. View my portfolio and get in touch.',
  keywords: ['frontend developer', 'web developer', 'portfolio', 'javascript', 'react', 'nextjs', 'typescript'],
  authors: [{ name: 'John Doe' }],
  creator: 'John Doe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://johndoe.dev',
    title: 'John Doe - Senior Frontend Developer',
    description: 'Passionate Senior Frontend Developer with expertise in modern web technologies.',
    siteName: 'John Doe Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'John Doe Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Doe - Senior Frontend Developer',
    description: 'Passionate Senior Frontend Developer with expertise in modern web technologies.',
    images: ['/og-image.jpg'],
    creator: '@johndoe',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main-content" className="visually-hidden">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
