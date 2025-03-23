import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'answers',
      type: 'json',
    },
    {
      name: 'recommendedBrokers',
      type: 'relationship',
      relationTo: ['brokers'], // Mettre dans un tableau pour hasMany
      hasMany: true,
      admin: {
        isSortable: true, // Optionnel : permet de réorganiser les relations par drag & drop
      }
    },
    {
      name: 'isSubscribedToNewsletter',
      type: 'checkbox',
      defaultValue: true,
    }
  ]
}