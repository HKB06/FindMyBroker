import { getPayloadInstance } from '@/lib/payload';

export async function fetchBrokers(category: string | null, numberPerPage: number, page: number) {
    const payload = await getPayloadInstance();
    
    const categoryToUse = category || 'assurance-vie';
    
    const response = await payload.find({
      collection: 'brokers',
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