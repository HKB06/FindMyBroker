// src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',

  /* ───────────────────────────────
     1. Authentification
     ─────────────────────────────── */
  auth: {
    /**
     * Active l’envoi du mail de vérification.
     * IMPORTANT : configure les variables SMTP (.env) :
     *  MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, etc.
     */
    verify: true,

    // Ex. : force un mot de passe un peu costaud
    // passwordMinLength: 8,
  },

  /* ───────────────────────────────
     2. Interface d’admin Payload
     ─────────────────────────────── */
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'verified', 'createdAt'],
  },

  /* ───────────────────────────────
     3. Règles d’accès API
     ─────────────────────────────── */
  access: {
    // Lecture :
    //   – les admins voient tout,
    //   – sinon uniquement leur propre fiche.
    read: ({ req }) =>
      req.user?.role === 'admin'
        ? true
        : { id: { equals: req.user?.id } },

    // Inscription ouverte (signup)
    create: () => true,

    // Modification / suppression : admins uniquement
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  /* ───────────────────────────────
     4. Champs
     ─────────────────────────────── */
  fields: [
    // Rôle
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User',  value: 'user'  },
      ],
      // Seul un admin peut voir ou modifier le rôle
      access: {
        read:   ({ req }) => req.user?.role === 'admin',
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],

  /* ───────────────────────────────
     5. Hooks
     ─────────────────────────────── */
  hooks: {
    /**
     * Évite qu’un utilisateur non-admin se promeuve lui-même.
     */
    beforeValidate: [
      ({ data, req }) => {
        if (req.user?.role !== 'admin') {
          return { ...data, role: 'user' }
        }
        return data
      },
    ],
  },
}
