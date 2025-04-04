import { getPayloadInstance } from './payload';
export async function fetchArticles(category: string | null, numberPerPage: number, page: number) {
    const payload = await getPayloadInstance();
    
    const categoryToUse = category || 'assurance-vie';
    
    const response = await payload.find({
      collection: 'articles',
      limit: numberPerPage,
      page: page,
      where: {
        category: {
          equals: categoryToUse,
        },
      },
    });
  
    return response;
  }