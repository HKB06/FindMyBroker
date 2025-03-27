import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Niveau d\'expérience',
          value: 'experience_level'
        },
        {
          label: 'Montant d\'investissement',
          value: 'investment_amount'
        },
        {
          label: 'Style de trading',
          value: 'trading_style'
        },
        {
          label: 'Actifs préférés',
          value: 'preferred_assets'
        }
      ],
      required: true,
    },
    {
      name: 'order',
      type: 'number',
    }
  ]
}