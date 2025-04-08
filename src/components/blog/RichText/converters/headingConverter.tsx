import { JSXConverters } from '@payloadcms/richtext-lexical/react';
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical';

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    // Rendre les enfants en JSX
    const children = nodesToJSX({ nodes: node.children });

    // Extraire le texte brut pour générer un ID
    const rawText = node.children
      .map((child: any) => child.text || "")
      .join("")
      .trim();

    // Normaliser le texte pour gérer les caractères spéciaux
    const id = rawText
      ? rawText
          .normalize("NFD") // Décompose les caractères accentués (é -> e + ́)
          .replace(/[\u0300-\u036f]/g, "") // Supprime les marques diacritiques
          .toLowerCase()
          .replace(/\s+/g, '-') // Remplace les espaces par des tirets
          .replace(/[^a-z0-9-]/g, '') // Supprime les caractères non valides
      : undefined;

    const Tag = node.tag;

    return <Tag id={id}>{children}</Tag>;
  },
};