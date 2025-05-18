import type { CollectionConfig } from 'payload'

export const Brokers: CollectionConfig = {
  slug: 'brokers',
  
  access: {
    read: () => true,                                   // public
    create: ({ req }) => req.user?.role === 'admin',    // admin only
    update: ({ req }) => req.user?.role === 'admin',    // admin only
    delete: ({ req }) => req.user?.role === 'admin',    // optionnel
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'minimumDeposit', 'isActive'],
    description: 'Gestion des brokers et leurs caractéristiques'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du broker',
      admin: {
        description: 'Nom officiel du broker'
      }
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo du broker',
      admin: {
        description: 'Logo officiel du broker (format recommandé : PNG)'
      }
    },
    {
      name:"referralLink",
      type:"text",
      label:"Lien d\'affiliation",
      admin: {
        description: "Lien d'affiliation pour le suivi des inscriptions"
      }
    },
    {
      name: "color",
      type: "text",
      label: "Couleur du broker",
      admin: {
        description: "Couleur principale du broker (format tailwind, ex: bg-[#6AAE22])"
      }
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
      admin: {
        description: 'Catégorie principale du broker'
      }
    },
    
    {
      name: 'description',
      type: 'richText',
      label: 'Description du broker',
      admin: {
        description: 'Description détaillée du broker et ses avantages'
      }
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      label: 'Note globale',
      admin: {
        description: 'Note générale du broker (de 0 à 5)'
      }
    },
    {
      name: 'minimumDeposit',
      type: 'number',
      label: 'Dépôt minimum',
      admin: {
        description: 'Montant minimum requis pour ouvrir un compte (en €)'
      }
    },
    {
      name: 'tradingFees',
      type: 'number',
      label: 'Frais de trading',
      admin: {
        description: 'Frais de trading moyens par transaction (en %)'
      }
    },
    {
      name: 'tradingInstruments',
      type: 'select',
      hasMany: true,
      label: 'Instruments de trading',
      options: [
        'Actions',
        'Forex',
        'Crypto',
        'CFDs',
        'ETFs',
        'Options',
        'Futures'
      ],
      admin: {
        description: 'Types d\'instruments financiers disponibles'
      }
    },
    {
      name: 'features',
      type: 'select',
      hasMany: true,
      label: 'Fonctionnalités',
      options: [
        'Interface Simple',
        'Trading Mobile',
        'Copy Trading',
        'Formation',
        'Support 24/7',
        'Trading API'
      ],
      admin: {
        description: 'Fonctionnalités principales offertes par le broker'
      }
    },
    {
      name: 'experienceLevel',
      type: 'select',
      label: 'Niveau d\'expérience',
      options: [
        'Débutant',
        'Intermédiaire',
        'Expert'
      ],
      admin: {
        description: 'Niveau d\'expérience recommandé pour ce broker'
      }
    },
    {
      name: 'affiliateLink',
      type: 'text',
      label: 'Lien d\'affiliation',
      admin: {
        description: 'Lien de parrainage pour le suivi des inscriptions'
      }
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Broker actif',
      admin: {
        description: 'Activer/désactiver l\'affichage du broker sur le site'
      }
    },
    {
      name: 'tradingStyles',
      type: 'select',
      hasMany: true,
      label: 'Styles de trading',
      options: [
        { label: 'Day Trading',   value: 'Day Trading'   },
        { label: 'Swing Trading', value: 'Swing Trading' },
        { label: 'Long Terme',    value: 'Long Terme'    },
        { label: 'Scalping',      value: 'Scalping'      },
      ],
    admin: {
      description: 'Styles de trading supportés par le broker',
    }
  },
  ]
}