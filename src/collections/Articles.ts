import { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true, 
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL unique de l\'article (ex: meilleur-broker-2025)',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Guide Trading', value: 'trading-guide' },
        { label: 'Analyse Brokers', value: 'broker-analysis' },
        { label: 'Actualités Trading', value: 'trading-news' },
        { label: 'Tutoriels', value: 'tutorials' },
        { label: 'Comparatifs', value: 'comparisons' }
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Assurance-vie', value: 'assurance-vie' },
        { label: 'Bourse', value: 'bourse' },
        { label: 'Crypto-monnaies', value: 'crypto-monnaies' },
        { label: 'Immobilier', value: 'immobilier' },
        { label: 'Retraite', value: 'retraite' },
        { label: 'Trading', value: 'trading' },
        { label: 'Autre', value: 'autre' }
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Bref résumé pour le SEO et les aperçus',
      },
    },
    {
      name: 'seoTitle',
      type: 'text',
      admin: {
        description: 'Titre optimisé pour le SEO (si différent du titre principal)',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      admin: {
        description: 'Meta description pour le SEO',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'En révision', value: 'review' },
        { label: 'Publié', value: 'published' }
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'Date de publication de l\'article',
      },
    },
    {
      name: 'relatedBrokers',
      type: 'relationship',
      relationTo: 'brokers',
      hasMany: true,
      admin: {
        description: 'Brokers mentionnés dans l\'article',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        }
      ],
    }
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      }
    ]
  }
}