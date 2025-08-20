import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Epiphany - Performance Headset + AI Browser",
  description: 'Enter deep focus on demand with Epiphany. Performance headset + AI browser for optimal flow state.',
  keywords: ["neurotech", "flow state", "AI browser", "deep focus", "productivity", "wearable tech"],
  authors: [{ name: "Epiphany" }],
  creator: "Epiphany",
  publisher: "Epiphany",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://epiphany.tech'),
  openGraph: {
    title: "Epiphany - Go with the Flow",
    description: "Wearable neurotech + AI browser to drop into deep focus—on demand.",
    url: 'https://epiphany.tech',
    siteName: 'Epiphany',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Epiphany - Go with the Flow',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Epiphany - Go with the Flow",
    description: "Wearable neurotech + AI browser to drop into deep focus—on demand.",
    images: ['/og.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=The+Seasons:wght@400&family=Poppins:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
