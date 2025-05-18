import { Inter } from 'next/font/google'
import React from 'react'
import './styles.css'
import { cn } from '@/lib/utils'
import PersonalInfo from './components/personal-info'

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
      <body className={cn(inter.className, 'dark')}>
        <main className="relative max-w-7xl mx-auto grid md:grid-cols-[296px_1fr] lg:grid-cols-[340px_1fr] xl:grid-cols-[300px_1fr_300px] min-h-screen">
          <PersonalInfo />
          {children}
        </main>
      </body>
    </html>
  )
}
