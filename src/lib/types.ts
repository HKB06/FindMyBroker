/**
 * Types d'articles utilisés pour le blog FindMyBroker.io
 * ------------------------------------------------------
 *  • `ArticleTypeSlug` : union littérale pour l'auto‑complétion
 *  • `ArticleType`     : interface réutilisable côté front
 *  • `types`           : tableau strictement typé – même nom qu'avant pour compatibilité
 */

export type ArticleTypeSlug =
  | 'broker-analysis'
  | 'trading-guide'
  | 'trading-news'
  | 'tutorials'
  | 'comparisons';

export interface ArticleType {
  slug: ArticleTypeSlug;
  name: string;
  color: string; // classe Tailwind (bg-*)
}

export const types: ArticleType[] = [
  {
    slug: 'broker-analysis',
    name: 'Analyse des brokers',
    color: 'bg-violet-900',
  },
  {
    slug: 'trading-guide',
    name: 'Guide de trading',
    color: 'bg-violet-800',
  },
  {
    slug: 'trading-news',
    name: 'Actualités du trading',
    color: 'bg-violet-700',
  },
  {
    slug: 'tutorials',
    name: 'Tutoriels',
    color: 'bg-violet-600',
  },
  {
    slug: 'comparisons',
    name: 'Comparatifs',
    color: 'bg-violet-500',
  },
];
