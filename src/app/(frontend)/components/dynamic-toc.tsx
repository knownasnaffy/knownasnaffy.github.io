'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function TOC() {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  // Collect all direct child h2s of #main
  useEffect(() => {
    const mainEl = document.getElementById('main')
    const h2s = mainEl?.querySelectorAll(':scope h2')
    const newHeadings: { id: string; text: string }[] = []

    h2s?.forEach((h2, index) => {
      if (!h2.id) h2.id = `heading-${index}`
      newHeadings.push({
        id: h2.id,
        text: h2.textContent || `Heading ${index}`,
      })
    })

    setHeadings(newHeadings)
  }, [])

  // Track which h2 is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0px 0px -70% 0px', // triggers slightly before fully in view
        threshold: 0,
      },
    )

    const mainEl = document.getElementById('main')
    const h2s = mainEl?.querySelectorAll(':scope h2')
    h2s?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  return (
    <aside className="sticky top-0 h-screen hidden xl:block border-l py-8">
      <h3 id="toc" className="px-8  font-semibold">
        ON THIS PAGE
      </h3>
      <ul className="mt-2 space-y-1 text-sm pr-8">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                'relative pl-8 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-[3px] ring-offset-2 ring-offset-background rounded-xs transition-all',
                activeId === h.id && 'pl-11',
              )}
            >
              {h.text}
              <span
                className={cn(
                  'bg-foreground absolute inset-y-0.5 w-0.5 left-8 rounded-sm transition-all',
                  activeId === h.id ? 'block' : 'hidden',
                )}
              />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
