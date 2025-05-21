import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { bundledLanguagesInfo, createCssVariablesTheme, createHighlighter } from 'shiki'

type CodeBlockFields = {
  code: string
  label: string
  language: string
}

export const codeBlockConverter: JSXConverters<SerializedBlockNode> = {
  blocks: {
    'code-block': async ({ node }: { node: { fields: CodeBlockFields } }) => {
      const myTheme = createCssVariablesTheme({
        name: 'css-variables',
        variablePrefix: '--shiki-',
        variableDefaults: {},
        fontStyle: true,
      })

      const highlighter = await createHighlighter({
        langs: bundledLanguagesInfo.map((item) => item.id),
        themes: [myTheme], // register the theme
      })
      const html = highlighter.codeToHtml(node.fields.code, {
        lang: node.fields.language,
        theme: 'css-variables',
      })
      return <div className="text-base custom-pre" dangerouslySetInnerHTML={{ __html: html }} />
    },
  },
}
