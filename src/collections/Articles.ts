import type { CollectionConfig } from 'payload'
import slugify from 'slugify'
import {
  FixedToolbarFeature,
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  ParagraphFeature,
  InlineToolbarFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'

/**
 * Collection: Articles
 * – Accès public uniquement si l'article est publié
 * – Slug auto‑généré depuis le titre
 * – Images filtrées (formats & taille)
 */
export const Articles: CollectionConfig = {
  slug: 'articles',

  /* ─────────────────────────── 1. Accès API ─────────────────────────── */
  access: {
    // Lecture publique => seulement les articles publiés
    read: ({ req }) => (req.user?.role === 'admin' ? true : { status: { equals: 'published' } }),

    // CRUD limité aux admins
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  /* ──────────────────────── 2. Interface d’admin ────────────────────── */
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'publishedAt'],
  },

  /* ───────────────────────────── 3. Hooks ───────────────────────────── */
  hooks: {
    /**
     * Génère / met à jour le slug si le titre change
     */
    beforeValidate: [({ data, originalDoc }) => {
      if (data?.title && (!data.slug || data.title !== originalDoc?.title)) {
        data.slug = slugify(data.title, { lower: true, strict: true })
      }
      return data
    }],
  },

  /* ───────────────────────────── 4. Champs ──────────────────────────── */
  fields: [
    // Titre
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },

    // Slug (readonly côté admin)
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: "URL unique de l’article (ex : meilleur-broker-2025)",
        readOnly: true,
      },
    },

    // Type éditorial
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Guide Trading', value: 'trading-guide' },
        { label: 'Analyse Brokers', value: 'broker-analysis' },
        { label: 'Actualités Trading', value: 'trading-news' },
        { label: 'Tutoriels', value: 'tutorials' },
        { label: 'Comparatifs', value: 'comparisons' },
      ],
    },

    // Catégorie
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Assurance‑vie', value: 'assurance-vie' },
        { label: 'Bourse', value: 'bourse' },
        { label: 'Crypto‑monnaies', value: 'crypto-monnaies' },
        { label: 'Immobilier', value: 'immobilier' },
        { label: 'Retraite', value: 'retraite' },
        { label: 'Trading', value: 'trading' },
        { label: 'Autre', value: 'autre' },
      ],
    },

    // Auteur (relation User)
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },

    // Image mise en avant
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { in: ['image/jpeg', 'image/png', 'image/webp'] },
      },
    },

    // Contenu riche (Lexical)
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          ParagraphFeature(),
          HorizontalRuleFeature(),
        ],
      }),
    },

    // Extrait court
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Bref résumé pour le SEO et les aperçus',
      },
    },

    // SEO
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

    // Workflow de publication
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'En révision', value: 'review' },
        { label: 'Publié', value: 'published' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'Date de publication de l’article',
      },
    },

    // Brokers associés
    {
      name: 'relatedBrokers',
      type: 'relationship',
      relationTo: 'brokers',
      hasMany: true,
      admin: {
        description: 'Brokers mentionnés dans l’article',
      },
    },

    // Tags
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
  ],
}
