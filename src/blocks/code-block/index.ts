import { Block } from 'payload'

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
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'JavaScript',
              value: 'js',
            },
            {
              label: 'TypeScript',
              value: 'ts',
            },
          ],
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
