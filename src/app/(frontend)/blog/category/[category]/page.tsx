import React from 'react'
import { getPayloadInstance } from '@/lib/payload';
import ListArticles from '../../ListArticles';
import { categories } from '@/lib/categories';
import BrokerRecommandationByCategory from '@/components/blog/BrokerRecommandationByCategory';
import { notFound } from 'next/navigation';

interface Params {
    category: string;
}

interface SearchParams {
    page?: string;
}

const CategoryPage = async ({
    params,
    searchParams
}: {
    params: Params,
    searchParams: SearchParams
}) => {
    const { category } = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const payload = await getPayloadInstance();
    const categoryData = categories.find(cat => cat.slug === category);

    let articles = await payload.find({
        collection: 'articles',
        where: {
            category: {
                equals: category
            }
        }
    });
    console.log('articles', articles);

    // if (!articles || articles.docs.length === 0) {
    //     return (
    //         <div className="w-screen h- flex flex-col justify-center items-center gap-8 px-24 py-40">
    //             <h2 className="text-3xl font-bold">Aucun article trouvé 🤕.</h2>
    //             <p className="text-md text-gray-500">Aucun article trouvé dans cette catégorie.</p>
    //         </div>
    //     );
    // }

    if (!categoryData) {
        notFound();
    }

    return (
        <div className={`w-screen h-full flex flex-col justify-center ${categoryData?.color}`}>
            <div className={`w-screen h-screen flex flex-col justify-center items-center gap-8 px-24`}>
                <h2 className="text-5xl font-black text-white pt-12 pb-3">{categoryData?.name}</h2>
                <p className='text-white w-1/2 text-center'>{categoryData?.desc}</p>
            </div>
            <div className='w-screen h-full flex flex-col justify-center gap-8 bg-gray-100 px-24 py-20'>
                <h2 className="text-4xl font-bold text-black pb-3">Nos articles sur <span className='lowercase'>{categoryData?.pres}</span></h2>
                <ListArticles category={category} numberPerPage={9} page={page} paginate={true} />
            </div>
            <div className={`w-screen h-full flex flex-col justify-center gap-8 px-24 py-20 ${categoryData?.color}`}>
                <h2 className="text-4xl font-bold text-white pb-3">Nos recommandations de brokers pour <span className='lowercase'>{categoryData?.pres}</span></h2>
                <BrokerRecommandationByCategory category={category} />
            </div>
        </div>
    )
}

export default CategoryPage