import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Katalog Stron Medycznych - Znajdź Zaufane Źródła Zdrowotne',
  description: 'Największy katalog stron medycznych w Polsce. Znajdź zaufane źródła informacji zdrowotnej, kliniki, lekarzy i specjalistów.',
  keywords: 'katalog medyczny, zdrowie, lekarze, kliniki, medycyna, zdrowie publiczne',
  authors: [{ name: 'Katalog Stron Medycznych' }],
  openGraph: {
    title: 'Katalog Stron Medycznych',
    description: 'Największy katalog stron medycznych w Polsce',
    type: 'website',
    locale: 'pl_PL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Katalog Stron Medycznych',
    description: 'Największy katalog stron medycznych w Polsce',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="canonical" href="https://katalogmedyczny.pl" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Katalog Stron Medycznych",
              "description": "Największy katalog stron medycznych w Polsce",
              "url": "https://katalogmedyczny.pl",
              "publisher": {
                "@type": "Organization",
                "name": "Katalog Stron Medycznych"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
