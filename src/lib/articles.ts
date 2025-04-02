import { getPayloadInstance } from './payload';

export async function fetchArticles(category: string | null) {
    const payload = await getPayloadInstance();
    const response = await payload.find({
        collection: 'articles',
        limit: 100, 
    });

    const filteredArticles = category
        ? response.docs.filter(article => article.category === category).slice(0, 6)
        : response.docs.slice(0, 6); 

    return filteredArticles;
}