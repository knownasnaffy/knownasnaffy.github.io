import { Inter } from 'next/font/google'
import React from 'react'
import './styles.css'
import { cn, getSiteUrl } from '@/lib/utils'
import PersonalInfo from './components/personal-info'
import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: 'Barinderpreet Singh · Portfolio',
  description: 'Portfolio of Barinderpreet Singh, web developer.',
  keywords: [
    'Barinderpreet Singh',
    'full-stack developer',
    'web development',
    'React',
    'Tailwind',
    'TypeScript',
    'Portfolio',
    'Punjab',
    'Next.js',
    'Open source',
  ],
  openGraph: {
    title: 'Barinderpreet Singh · Portfolio',
    description: 'Full-stack developer portfolio.',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Barinderpreet Singh Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barinderpreet Singh · Portfolio',
    description: 'Showcase of skills and highlights.',
    images: [`${siteUrl}/og-image.png`],
  },
}

const inter = Inter({
  subsets: ['latin'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={cn(inter.className, 'dark')}>
        <main className="relative max-w-7xl mx-auto grid md:grid-cols-[296px_1fr] lg:grid-cols-[340px_1fr] xl:grid-cols-[300px_1fr_300px] min-h-screen">
          <PersonalInfo />
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  )
}
