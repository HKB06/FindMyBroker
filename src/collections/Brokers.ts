// src/collections/Brokers.ts
import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  LinkFeature,
  ParagraphFeature,
  HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'

export const Brokers: CollectionConfig = {
  slug: 'brokers',

  /* ─────────── 1. Accès API ─────────── */
  access: {
    read: () => true,                                   // public
    create: ({ req }) => req.user?.role === 'admin',    // admin only
    update: ({ req }) => req.user?.role === 'admin',    // admin only
    delete: ({ req }) => req.user?.role === 'admin',
  },

  /* ─────────── 2. Admin UI ─────────── */
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'rating', 'minimumDeposit', 'isActive'],
    description: 'Gestion des brokers et de leurs caractéristiques',
  },

  /* ─────────── 3. Champs ─────────── */
  fields: [
    /* Identité ------------------------------------------------------- */
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Nom du broker',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Généré automatiquement à partir du nom',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo (PNG, SVG…)',
    },
    {
      name: 'primaryColor',
      type: 'text',
      label: 'Couleur principale',
      admin: { description: 'Ex. : #6AAE22 ou bg-[#6AAE22]' },
    },

    /* Liens ---------------------------------------------------------- */
    {
      name: 'website',
      type: 'text',
      label: 'Site officiel',
    },
    {
      name: 'affiliateLink',
      type: 'text',
      label: 'Lien d’affiliation',
    },

    /* Catégorisation ------------------------------------------------- */
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Assurance-vie',       value: 'assurance-vie' },
        { label: 'Bourse',              value: 'bourse' },
        { label: 'Crypto-monnaies',     value: 'crypto-monnaies' },
        { label: 'Immobilier',          value: 'immobilier' },
        { label: 'Retraite',            value: 'retraite' },
        { label: 'Trading',             value: 'trading' },
        { label: 'Autre',               value: 'autre' },
      ],
    },
    {
      name: 'experienceLevel',
      type: 'select',
      defaultValue: 'Débutant',
      label: 'Niveau d’expérience',
      options: [
        { label: 'Débutant',      value: 'Débutant' },
        { label: 'Intermédiaire', value: 'Intermédiaire' },
        { label: 'Expert',        value: 'Expert' },
      ],
    },

    /* Chiffres clés -------------------------------------------------- */
    {
      name: 'rating',
      type: 'number',
      label: 'Note (0 – 5)',
      min: 0,
      max: 5,
      defaultValue: 0,
      admin: {
        step: 0.1,
      },
    },
    {
      name: 'minimumDeposit',
      type: 'number',
      label: 'Dépôt minimum (€)',
    },
    {
      name: 'tradingFees',
      type: 'number',
      label: 'Frais de trading (%)',
    },

    /* Description riche ---------------------------------------------- */
    {
      name: 'description',
      type: 'richText',
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

    /* Facettes ------------------------------------------------------- */
    {
      name: 'tradingInstruments',
      type: 'select',
      hasMany: true,
      label: 'Instruments proposés',
      options: [
        { label: 'Actions',  value: 'actions' },
        { label: 'Forex',    value: 'forex' },
        { label: 'Crypto',   value: 'crypto' },
        { label: 'CFDs',     value: 'cfds' },
        { label: 'ETFs',     value: 'etfs' },
        { label: 'Options',  value: 'options' },
        { label: 'Futures',  value: 'futures' },
      ],
    },
    {
      name: 'features',
      type: 'select',
      hasMany: true,
      label: 'Fonctionnalités',
      options: [
        { label: 'Interface simple',    value: 'interface-simple' },
        { label: 'Application mobile',  value: 'mobile' },
        { label: 'Copy-trading',        value: 'copy-trading' },
        { label: 'Formation incluse',   value: 'education' },
        { label: 'Support 24/7',        value: 'support-247' },
        { label: 'API de trading',      value: 'api' },
      ],
    },
    {
      name: 'tradingStyles',
      type: 'select',
      hasMany: true,
      label: 'Styles de trading',
      options: [
        { label: 'Day-Trading',  value: 'day' },
        { label: 'Swing-Trading',value: 'swing' },
        { label: 'Long-terme',   value: 'long' },
        { label: 'Scalping',     value: 'scalping' },
      ],
    },

    /* Status --------------------------------------------------------- */
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Actif (affiché sur le site)',
      defaultValue: true,
    },
  ],

  /* ─────────── 4. Hooks ─────────── */
  hooks: {
    beforeValidate: [
      ({ data, originalDoc }) => {
        // Slug auto → si création ou si le nom a changé
        if (data?.name && (!originalDoc?.slug || data.name !== originalDoc.name)) {
          return {
            ...data,
            slug: slugify(data.name, { lower: true, strict: true }),
          }
        }
        return data
      },
    ],
  },
}
