'use client'

import { useRef } from 'react'
import PersonalInfo from './components/personal-info'
import Portfolio from './components/portfolio'
import TOC from './components/dynamic-toc'

export default function ClientHomePage() {
  const mainRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <PersonalInfo />
      <Portfolio mainRef={mainRef} />
      <aside className="sticky top-0 h-screen hidden xl:block border-l px-8 py-8">
        <h3 id="toc" className=" font-semibold">
          Table of Contents
        </h3>
        <TOC mainRef={mainRef} />
      </aside>
    </>
  )
}
