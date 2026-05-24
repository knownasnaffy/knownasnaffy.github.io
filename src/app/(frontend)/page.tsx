import React from 'react'

import './styles.css'
import Portfolio from './components/portfolio'
import { getSiteUrl } from '@/lib/utils'

const siteUrl = getSiteUrl()

export const metadata = {
  title: 'Portfolio · Barinderpreet Singh',
  description: 'Homepage of Barinderpreet Singh.',
  openGraph: {
    title: 'Portfolio · Barinderpreet Singh',
    description: 'Discover the work and background.',
    url: siteUrl,
    images: [{ url: `${siteUrl}/og-image.png` }],
  },
}

export default async function HomePage() {
  return (
    <>
      <Portfolio />
    </>
  )
}
