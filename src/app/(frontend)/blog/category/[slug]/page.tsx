import React from 'react'
import { getPayloadInstance } from '@/lib/payload';
import ListArticles from '../../ListArticles';
import Link from 'next/link';
import { categories } from '@/lib/categories';
import BrokerRecommandationByCategory from '@/components/blog/BrokerRecommandationByCategory';

interface Params {
    slug: string;
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
    const { slug } = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const payload = await getPayloadInstance();
    const category = categories.find(cat => cat.slug === slug);

    let articles = await payload.find({
        collection: 'articles',
        where: {
            category: {
                equals: slug
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

    return (
        <div className={`w-screen h-full flex flex-col justify-center ${category?.color}`}>
            <div className={`w-screen h-screen flex flex-col justify-center items-center gap-8 px-24`}>
                <h2 className="text-5xl font-black text-white pt-12 pb-3">{category?.name}</h2>
                <p className='text-white w-1/2 text-center'>{category?.desc}</p>
            </div>
            <div className='w-screen h-full flex flex-col justify-center gap-8 bg-gray-100 px-24 py-20'>
                <h2 className="text-4xl font-bold text-black pb-3">Nos articles sur <span className='lowercase'>{category?.pres}</span></h2>
                <ListArticles category={slug} numberPerPage={9} page={page} paginate={true} />
            </div>
            <div className={`w-screen h-full flex flex-col justify-center gap-8 px-24 py-20 ${category?.color}`}>
                <h2 className="text-4xl font-bold text-white pb-3">Nos recommandations de brokers pour <span className='lowercase'>{category?.pres}</span></h2>
                <BrokerRecommandationByCategory category={slug} />
            </div>
        </div>
    )
}

export default CategoryPage