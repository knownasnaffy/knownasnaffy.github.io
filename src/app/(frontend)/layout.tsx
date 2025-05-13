import { Inter } from 'next/font/google'
import React from 'react'
import './styles.css'
import { cn } from '@/lib/utils'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const inter = Inter({
  subsets: ['latin'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={cn(inter.className, 'dark')}>{children}</body>
    </html>
  )
}
