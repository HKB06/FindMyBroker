import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt', 'hasDetailedReport'],
    description: 'Utilisateurs ayant demandé le rapport détaillé'
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'Email'
    },
    {
      name: 'quizProfile',
      type: 'group',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true
        },
        {
          name: 'answers',  // Ajout des réponses
          type: 'array',
          fields: [
            {
              name: 'question',
              type: 'relationship',
              relationTo: 'questions',
              required: true
            },
            {
              name: 'selectedAnswer',
              type: 'text',
              required: true
            }
          ]
        },
        {
          name: 'scores',  // Ajout des scores
          type: 'array',
          fields: [
            {
              name: 'criterion',
              type: 'text'
            },
            {
              name: 'score',
              type: 'number'
            }
          ]
        },
        {
          name: 'topBrokers',
          type: 'relationship',
          relationTo: 'brokers',
          hasMany: true
        },
        {
          name: 'extendedBrokers',
          type: 'relationship',
          relationTo: 'brokers',
          hasMany: true
        },
        {
          name: 'profileSummary',
          type: 'text'
        }
      ]
    },
    {
      name: 'hasDetailedReport',
      type: 'checkbox',
      defaultValue: true,
      label: 'A reçu le rapport détaillé'
    },
    {
      name: 'newsletterOptIn',
      type: 'checkbox',
      defaultValue: false,
      label: 'Inscrit à la newsletter'
    }
  ]
}