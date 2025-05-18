import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import Portfolio from './components/portfolio'
import PersonalInfo from './components/personal-info'
import TOC from './components/dynamic-toc'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  console.log(user)

  return (
    <>
      <main className="relative max-w-7xl mx-auto grid md:grid-cols-[296px_1fr] lg:grid-cols-[340px_1fr] xl:grid-cols-[300px_1fr_250px] min-h-screen">
        <PersonalInfo />
        <Portfolio />
        <TOC />
      </main>
    </>
  )
}
