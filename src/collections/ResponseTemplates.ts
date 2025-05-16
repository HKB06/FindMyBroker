import type { CollectionConfig } from 'payload'

interface ValidationError {
  message: string;
}

export const ResponseTemplates: CollectionConfig = {
  slug: 'response-templates',
  access: {
    read: () => true,                                   // public
    create: ({ req }) => req.user?.role === 'admin',    // admin only
    update: ({ req }) => req.user?.role === 'admin',    // admin only
    delete: ({ req }) => req.user?.role === 'admin',    // optionnel
  },
  admin: {
    useAsTitle: 'name',
    description: 'Modèles de réponses pour les questions',
    defaultColumns: ['name', 'category', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du modèle',
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
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
      label: 'Catégorie',
      admin: {
        description: 'Catégorie du modèle pour un meilleur classement'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Description détaillée du modèle et de son utilisation'
      }
    },
    {
      name: 'responses',
      type: 'json',
      required: true,
      label: 'Réponses (JSON)',
      admin: {
        description: `Format attendu:
[
  {
    "answerText": "Texte de la réponse",
    "impacts": [
      {
        "criterion": "beginner_friendly",
        "points": 5
      }
    ]
  }
]`
      }
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Actif',
      admin: {
        description: 'Désactiver temporairement ce modèle'
      }
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        try {
          const responses = JSON.parse(JSON.stringify(data.responses));
          if (!Array.isArray(responses)) {
            throw new Error('Les réponses doivent être un tableau');
          }
          
          responses.forEach((response: any) => {
            if (!response.answerText || !Array.isArray(response.impacts)) {
              throw new Error('Format de réponse invalide');
            }
          });
        } catch (error: unknown) {
          const validationError = error as ValidationError;
          throw new Error(`Format JSON invalide: ${validationError.message}`);
        }
        return data;
      }
    ]
  }
}