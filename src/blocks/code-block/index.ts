import { Block } from 'payload'
import { bundledLanguagesInfo } from 'shiki'

export const CodeBlock: Block = {
  slug: 'code-block',
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'language',
          type: 'select',
          defaultValue: 'none',
          options: bundledLanguagesInfo.map((item) => ({ label: item.name, value: item.id })),
        },
        {
          name: 'label',
          label: 'Tab Label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'code',
      type: 'textarea',
      required: true,
    },
  ],
}
