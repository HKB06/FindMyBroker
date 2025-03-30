import type { CollectionConfig } from 'payload'

export const ResponseTemplates: CollectionConfig = {
  slug: 'response-templates',
  admin: {
    useAsTitle: 'name',
    description: 'Modèles de réponses pour les questions',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du modèle',
    },
    {
      name: 'responses',
      type: 'json',
      required: true,
      label: 'Réponses (JSON)',
      admin: {
        description: 'Format: [{"answerText": "...", "impacts": [{"criterion": "...", "points": 5}]}]'
      }
    }
  ]
}