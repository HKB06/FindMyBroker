import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',

  /* ───────────────────────────────────
     Accès API
     ───────────────────────────────────
     • POST   /api/subscribers   → ouvert (un visiteur peut s’inscrire)
     • GET    /api/subscribers   → admin connecté uniquement
     • PATCH  /api/subscribers/:id / DELETE … → admin uniquement
  */
  access: {
    create: () => true,
    read:   ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  /* ───────────────────────────────────
     Interface d’administration Payload
  */
  admin: {
    useAsTitle: 'email',
    description: 'Utilisateurs ayant demandé le rapport détaillé',
    defaultColumns: ['email', 'hasDetailedReport', 'createdAt'],
  },

  /* ───────────────────────────────────
     Champs
  */
  fields: [
    // —───────────────── Email
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'Email',
    },

    // —───────────────── Résultat du quiz
    {
      name: 'quizProfile',
      type: 'group',
      label: 'Profil issu du quiz',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          label: 'Date du quiz',
        },
        {
          name: 'answers',
          type: 'array',
          label: 'Réponses',
          fields: [
            {
              name: 'question',
              type: 'relationship',
              relationTo: 'questions',
              required: true,
              label: 'Question',
            },
            {
              name: 'selectedAnswer',
              type: 'text',
              required: true,
              label: 'Réponse sélectionnée',
            },
          ],
        },
        {
          name: 'scores',
          type: 'array',
          label: 'Scores par critère',
          fields: [
            { name: 'criterion', type: 'text',   label: 'Critère' },
            { name: 'score',     type: 'number', label: 'Score'   },
          ],
        },
        {
          name: 'topBrokers',
          type: 'relationship',
          relationTo: 'brokers',
          hasMany: true,
          label: 'Top 3 brokers',
        },
        {
          name: 'extendedBrokers',
          type: 'relationship',
          relationTo: 'brokers',
          hasMany: true,
          label: 'Liste étendue de brokers',
        },
        {
          name: 'profileSummary',
          type: 'text',
          label: 'Résumé du profil',
        },
      ],
    },

    // —───────────────── Flags
    {
      name: 'hasDetailedReport',
      type: 'checkbox',
      label: 'Rapport détaillé envoyé',
      defaultValue: true,
    },
    {
      name: 'newsletterOptIn',
      type: 'checkbox',
      label: 'Abonné à la newsletter',
      defaultValue: false,
    },
  ],
}
