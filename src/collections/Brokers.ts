import type { CollectionConfig } from 'payload'

export const Brokers: CollectionConfig = {
  slug: 'brokers',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'minimumDeposit', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
    },
    {
      name: 'minimumDeposit',
      type: 'number',
    },
    {
      name: 'tradingFees',
      type: 'number',
    },
    {
      name: 'tradingInstruments',
      type: 'select',
      hasMany: true,
      options: [
        'Stocks',
        'Forex',
        'Crypto',
        'CFDs',
        'ETFs',
        'Options',
        'Futures'
      ]
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    }
  ]
}