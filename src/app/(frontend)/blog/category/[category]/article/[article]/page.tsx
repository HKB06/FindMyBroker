import React from 'react';
import { getPayloadInstance } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { types } from '@/lib/types';
import { categories } from '@/lib/categories';

interface Params {
    article: string;
}

const ArticlePage = async ({
    params,
}: {
    params: Params;
}) => {
    const { article } = params;
    const payload = await getPayloadInstance();

    const articles = await payload.find({
        collection: 'articles',
        where: {
            slug: {
                equals: article,
            },
        },
    });

    const articleData = articles?.docs?.[0];
    console.log('articleData', articleData);

    if (!articleData) {
        notFound();
    }
    const type = types.find(cat => cat.slug == articleData.type) || { name: articleData.type, color: 'bg-gray-500' };
    const category = categories.find(cat => cat.slug == articleData.category) || { name: articleData.category, color: 'bg-gray-500' }

    return (
        <div className="w-screen h-full flex flex-col justify-center items-start gap-8 py-30 px-24">
            <div className='flex relative w-full h-full'>
                <div className="flex flex-col gap-4 absolute z-0 w-full rounded-3xl">
                    {typeof articleData.featuredImage === 'object' && articleData.featuredImage !== null ? (
                        <img src={`${(process.env.NEXT_PUBLIC_SERVER_URL ?? '') + articleData.featuredImage.url}`} alt={articleData.title} className="h-96 object-cover rounded-3xl" />
                    ) : null}
                    <div className='absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm rounded-3xl'></div>
                </div>
                <div className="flex flex-col gap-4 z-20 relative h-96 w-full pt-8 pb-6 px-12 text-white">
                    <div className='flex justify-between gap-4 h-full w-full'>
                        <div className='flex flex-col justify-between w-full pr-12'>
                            <div className='flex flex-col gap-8 justify-center h-full'>
                                <h3 className="text-3xl font-bold">{articleData.title}</h3>
                                <p className="text-xl text-gray-300">{articleData.excerpt}</p>
                            </div>
                            <p className="text-md text-gray-300">Publié le {articleData.publishedAt ? new Date(articleData.publishedAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) : 'Date inconnue'}</p>
                        </div>
                        <div className='w-6/12 h-fit flex flex-wrap gap-1 gap-y-3 justify-end absolute right-0 top-0 p-4'>
                            <span className={`rounded-xl py-1 px-3 text-sm ${type.color || 'bg-gray-500'}`}>{type.name || articleData.type}</span>
                            <span className={`rounded-xl py-1 px-3 text-sm ${category.color || 'bg-gray-500'}`}>{category.name || articleData.category}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold 
                prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl 
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
                prose-blockquote:pl-4 prose-blockquote:italic mb-4'>
                {/* {articleData.content && <RichText data={articleData.content} />} */}
            </div>
        </div>
    );
};

export default ArticlePage;