import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Providers } from '@/components/providers'
import NextTopLoader from 'nextjs-toploader'
import Header from '@/components/header'


export const metadata: Metadata = {
  title: 'Find my deals',
  description: 'Created by Ateeb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style data-rc-order="prependQueue" data-rc-priority="-999" data-css-hash="p5rdw6" data-token-hash="1vclpbn">{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <Header/>
        <NextTopLoader
          color="#10b981"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
