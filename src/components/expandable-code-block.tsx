'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ExpandableCodeBlockProps {
  html: string
  lineCount: number
  language: string
  label?: string
}

export default function ExpandableCodeBlock({
  html,
  lineCount,
  language,
  label,
}: ExpandableCodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Only show collapse functionality if more than 30 lines
  const shouldCollapse = lineCount > 30

  return (
    <div className="relative">
      <div className="bg-shikhi-background text-shikhi-foreground rounded-t-md -mb-6 w-fit py-2 px-3.5 text-xs">
        {label} <span className="italic text-muted-foreground text-xs ml-1">{language}</span>
      </div>
      <div
        className={`text-base custom-pre [&>pre]:rounded-md [&>pre]:rounded-tl-none overflow-hidden transition-all duration-300 ease-in-out ${
          shouldCollapse && !isExpanded ? 'max-h-96' : 'max-h-none'
        }`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {shouldCollapse && (
        <div className={cn(!isExpanded ? 'absolute bottom-0 left-0 right-0' : 'mt-2')}>
          {!isExpanded && (
            <div className="bg-gradient-to-t from-foreground to-transparent h-4 pointer-events-none peer-hover:brightness-75" />
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'peer w-full bg-foreground hover:brightness-75 text-background text-sm font-medium py-2 px-4 transition-colors duration-200 flex items-center justify-center gap-2',
              isExpanded ? 'rounded-sm' : 'rounded-b-sm',
            )}
            aria-label={isExpanded ? 'Collapse code block' : 'Expand code block'}
          >
            <span>{isExpanded ? 'Show Less' : `Show More (${lineCount} lines)`}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
