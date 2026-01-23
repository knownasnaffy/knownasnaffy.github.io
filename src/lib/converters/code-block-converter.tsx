import type { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { createHighlighter, createCssVariablesTheme, bundledLanguagesInfo, type Highlighter } from 'shiki'
import ExpandableCodeBlock from '@/components/expandable-code-block'

type CodeBlockFields = {
  code: string
  label: string
  language: string
}

let highlighterInstance: Highlighter | null = null

const getHighlighter = async (): Promise<Highlighter> => {
  if (!highlighterInstance) {
    const myTheme = createCssVariablesTheme({
      name: 'css-variables',
      variablePrefix: '--shiki-',
      variableDefaults: {},
      fontStyle: true,
    })

    highlighterInstance = await createHighlighter({
      langs: bundledLanguagesInfo.map((item) => item.id),
      themes: [myTheme],
    })
  }
  return highlighterInstance
}

export const codeBlockConverter: JSXConverters<SerializedBlockNode> = {
  blocks: {
    'code-block': async ({ node }: { node: { fields: CodeBlockFields } }) => {
      const highlighter = await getHighlighter()

      const html = highlighter.codeToHtml(node.fields.code, {
        lang: node.fields.language,
        theme: 'css-variables',
        tabindex: false,
      })

      // Count lines for the client component
      const lineCount = node.fields.code.split('\n').length

      // Pass the pre-rendered HTML and metadata to the client component
      return (
        <ExpandableCodeBlock
          html={html}
          lineCount={lineCount}
          language={node.fields.language}
          label={node.fields.label}
          code={node.fields.code}
        />
      )
    },
  },
}
