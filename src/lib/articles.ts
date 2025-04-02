import { getPayloadInstance } from './payload';

export async function fetchArticles(category: string | null) {
    const payload = await getPayloadInstance();
    const response = await payload.find({
        collection: 'articles',
        limit: 100, // Récupérer tous les articles (on filtre après)
    });

    const filteredArticles = category
        ? response.docs.filter(article => article.category === category).slice(0, 6) // Limite à 6
        : response.docs.slice(0, 6); // Par défaut, 6 articles

    return filteredArticles;
}