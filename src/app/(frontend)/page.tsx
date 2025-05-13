import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import ClientHomePage from './client-comp'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
  return (
    <>
      <main className="relative max-w-7xl mx-auto grid md:grid-cols-[296px_1fr] lg:grid-cols-[340px_1fr] xl:grid-cols-[296px_1fr_250px] min-h-screen">
        <ClientHomePage />
      </main>
    </>
  )
}
