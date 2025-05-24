import type { CollectionConfig } from 'payload'

/**
 * Questions utilisées dans le questionnaire de recommandation de brokers.
 * Chaque question propose plusieurs choix dont les « impacts » feront varier
 * les scores des critères côté back‑end.
 */
export const Questions: CollectionConfig = {
  slug: 'questions',

  /**
   * Interface d’admin
   */
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    description:
      'Questions du questionnaire utilisées pour personnaliser les recommandations de brokers',
  },

  /**
   * Règles d’accès (très strictes : seule l’équipe peut modifier)
   */
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  /**
   * Champs principaux
   */
  fields: [
    // Texte de la question ---------------------------------------------------
    {
      name: 'question',
      label: 'Question',
      type: 'text',
      required: true,
    },

    // Catégorie --------------------------------------------------------------
    {
      name: 'category',
      label: 'Catégorie',
      type: 'select',
      required: true,
      options: [
        { label: "Niveau d'expérience", value: 'experience_level' },
        { label: "Montant d'investissement", value: 'investment_amount' },
        { label: 'Style de trading', value: 'trading_style' },
        { label: 'Actifs préférés', value: 'preferred_assets' },
        { label: 'Fonctionnalités recherchées', value: 'desired_features' },
        { label: 'Support et Formation', value: 'support_education' },
      ],
    },

    // Ordre d’affichage ------------------------------------------------------
    {
      name: 'order',
      label: "Ordre d'affichage",
      type: 'number',
      required: true,
      admin: {
        description: 'Plus la valeur est basse, plus la question apparaît tôt',
      },
    },

    // Modèle de réponses prédéfini -----------------------------------------
    {
      name: 'responseTemplate',
      label: 'Modèle de réponses',
      type: 'relationship',
      relationTo: 'response-templates',
    },

    // Choix proposés à l’utilisateur ----------------------------------------
    {
      name: 'choices',
      label: 'Choix de réponses',
      type: 'array',
      required: true,
      admin: {
        description: 'Réponses possibles et impact sur les critères',
      },
      fields: [
        {
          name: 'answerText',
          label: 'Texte de la réponse',
          type: 'text',
          required: true,
        },
        {
          name: 'impacts',
          label: 'Impacts',
          type: 'array',
          fields: [
            {
              name: 'criterion',
              label: 'Critère',
              type: 'select',
              required: true,
              options: [
                // — Expérience —
                { label: 'Débutant', value: 'beginner_friendly' },
                { label: 'Intermédiaire', value: 'intermediate' },
                { label: 'Expert', value: 'advanced' },
                // — Style de trading —
                { label: 'Day Trading', value: 'day_trading' },
                { label: 'Swing Trading', value: 'swing_trading' },
                { label: 'Long Terme', value: 'long_term' },
                { label: 'Scalping', value: 'scalping' },
                // — Instruments —
                { label: 'Actions', value: 'stocks' },
                { label: 'ETF', value: 'etf' },
                { label: 'Crypto', value: 'crypto' },
                { label: 'Forex', value: 'forex' },
                { label: 'Options', value: 'options' },
                // — Services —
                { label: 'Support Client', value: 'customer_support' },
                { label: 'Formation', value: 'education' },
                { label: 'Outils Avancés', value: 'advanced_tools' },
                { label: 'Frais Bas', value: 'low_fees' },
                // — Plateforme —
                { label: 'Interface Simple', value: 'simple_interface' },
                { label: 'Mobile Trading', value: 'mobile_trading' },
                { label: 'API Trading', value: 'api_trading' },
              ],
            },
            {
              name: 'points',
              label: 'Points',
              type: 'number',
              required: true,
              min: -10,
              max: 10,
              admin: {
                description: 'Impact de cette réponse sur le critère (-10 à +10)',
              },
            },
          ],
        },
      ],
    },

    // Poids de la question dans le calcul final -----------------------------
    {
      name: 'weight',
      label: 'Importance',
      type: 'select',
      required: true,
      defaultValue: 'normal',
      options: [
        { label: 'Très importante', value: 'high' },
        { label: 'Normale', value: 'normal' },
        { label: 'Faible', value: 'low' },
      ],
    },

    // Aide contextuelle ------------------------------------------------------
    {
      name: 'helpText',
      label: "Texte d'aide",
      type: 'textarea',
    },
  ],

  /**
   * Si l’admin sélectionne un « responseTemplate », on copie automatiquement
   * les réponses dans le champ `choices` avant l’enregistrement.
   */
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.responseTemplate) {
          const template = await req.payload.findByID({
            collection: 'response-templates',
            id: data.responseTemplate as string,
          })

          if (template?.responses) {
            data.choices = template.responses
          }
        }
        return data
      },
    ],
  },
}
