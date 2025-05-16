import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,                                   // public
    create: ({ req }) => req.user?.role === 'admin',    // admin only
    update: ({ req }) => req.user?.role === 'admin',    // admin only
    delete: ({ req }) => req.user?.role === 'admin',    // optionnel
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Gestion des images (logos, illustrations, etc.)'
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 200,
        height: 200,
        position: 'center'
      },
      {
        name: 'logo',
        width: 400,
        height: 400,
        position: 'center'
      }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/png', 'image/jpeg', 'image/svg+xml']
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif',
      admin: {
        description: 'Description de l\'image pour l\'accessibilité'
      }
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Logo Broker',
          value: 'broker-logo'
        },
        {
          label: 'Illustration',
          value: 'illustration'
        },
        {
          label: 'Autre',
          value: 'other'
        }
      ],
      admin: {
        description: 'Type d\'image'
      }
    }
  ]
}