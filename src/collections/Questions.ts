import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    description: 'Questions du questionnaire de recommandation de brokers',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
      // Suppression de la validation qui causait l'erreur
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
        },
        {
          label: 'Fonctionnalités recherchées',
          value: 'desired_features'
        },
        {
          label: 'Support et Formation',
          value: 'support_education'
        }
      ],
      required: true,
      label: 'Catégorie',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'Ordre d\'affichage',
      admin: {
        description: 'Ordre d\'affichage de la question (1, 2, 3...)',
      }
    },
    {
      name: 'responseTemplate',
      type: 'relationship',
      relationTo: 'response-templates',
      hasMany: false,
      label: 'Modèle de réponses',
      admin: {
        description: 'Sélectionnez un modèle de réponses ou créez les réponses manuellement'
      }
    },
    {
      name: 'choices',
      type: 'array',
      label: 'Choix de réponses',
      required: true,
      admin: {
        description: 'Les différentes réponses possibles et leurs impacts',
      },
      fields: [
        {
          name: 'answerText',
          type: 'text',
          required: true,
          label: 'Texte de la réponse',
        },
        {
          name: 'impacts',
          type: 'array',
          label: 'Impact sur les critères',
          fields: [
            {
              name: 'criterion',
              type: 'select',
              required: true,
              label: 'Critère',
              options: [
                // Niveau d'expérience
                { label: 'Débutant', value: 'beginner_friendly' },
                { label: 'Intermédiaire', value: 'intermediate' },
                { label: 'Expert', value: 'advanced' },
                
                // Style de trading
                { label: 'Day Trading', value: 'day_trading' },
                { label: 'Swing Trading', value: 'swing_trading' },
                { label: 'Long Terme', value: 'long_term' },
                { label: 'Scalping', value: 'scalping' },
                
                // Instruments
                { label: 'Actions', value: 'stocks' },
                { label: 'ETF', value: 'etf' },
                { label: 'Crypto', value: 'crypto' },
                { label: 'Forex', value: 'forex' },
                { label: 'Options', value: 'options' },
                
                // Services
                { label: 'Support Client', value: 'customer_support' },
                { label: 'Formation', value: 'education' },
                { label: 'Outils Avancés', value: 'advanced_tools' },
                { label: 'Frais Bas', value: 'low_fees' },
                
                // Plateforme
                { label: 'Interface Simple', value: 'simple_interface' },
                { label: 'Mobile Trading', value: 'mobile_trading' },
                { label: 'API Trading', value: 'api_trading' }
              ]
            },
            {
              name: 'points',
              type: 'number',
              required: true,
              label: 'Points',
              min: -10,
              max: 10,
              admin: {
                description: 'Impact en points (-10 à +10)',
              }
            }
          ]
        }
      ]
    },
    {
      name: 'weight',
      type: 'select',
      label: 'Importance de la question',
      required: true,
      defaultValue: 'normal',
      options: [
        {
          label: 'Très importante',
          value: 'high'
        },
        {
          label: 'Normale',
          value: 'normal'
        },
        {
          label: 'Faible',
          value: 'low'
        }
      ],
      admin: {
        description: 'Influence le poids de cette question dans le calcul final',
      }
    },
    {
      name: 'helpText',
      type: 'textarea',
      label: 'Texte d\'aide',
      admin: {
        description: 'Texte explicatif optionnel pour aider l\'utilisateur',
      }
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.responseTemplate) {
          const template = await req.payload.findByID({
            collection: 'response-templates',
            id: data.responseTemplate as string
          });
          if (template && template.responses) {
            data.choices = template.responses;
          }
        }
        return data;
      }
    ]
  }
}