// src/collections/Users.ts
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,                     // toujours la collection auth
  admin: { useAsTitle: 'email' },

  /* 1. Règles d'accès strictes */
  access: {
    read:   ({ req }) => !!req.user,            // lecture = connecté
    create: () => true,                         // inscription ouverte
    update: ({ req }) => req.user?.role === 'admin',
  },

  /* 2. Champs */
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User',  value: 'user'  },
      ],

      /* — accès champ : seul un admin peut toucher à “role” — */
      access: {
        read:   ({ req }) => req.user?.role === 'admin',
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],

  /* 3. Hook : impossible de s’auto-promouvoir */
  hooks: {
  beforeValidate: [
    ({ data = {}, req }) => {

      if (req.user?.role !== 'admin') {
        // on force le rôle à "user"
        (data as any).role = 'user';
      }
      return data;
    },
  ],
},
};
