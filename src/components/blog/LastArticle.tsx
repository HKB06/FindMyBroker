import React from 'react'
import { getPayloadInstance } from '@/lib/payload';
import Link from 'next/link';
import { ChevronRight, CornerDownLeft } from 'lucide-react';
import { types } from '@/lib/types';
import { categories } from '@/lib/categories';
import { Button } from '../ui/button';

const LastArticle = async () => {
    const payload = await getPayloadInstance();
    const lastArticle = await payload.find({
        collection: 'articles',
        limit: 1,
        sort: '-createdAt',
    });

    console.log('lastArticle', lastArticle);

    if (!lastArticle || lastArticle.docs.length === 0) {
        return (
            <div className="w-screen h- flex flex-col justify-center items-center gap-8 px-24 py-40">
                <h2 className="text-3xl font-bold">Aucun article trouvé 🤕.</h2>
                <Button className="p-6 cursor-pointer text-md md:text-lg text-white bg-[#8B5CF6] hover:bg-[#743cf4]">
                    <Link href="/" className="flex items-center gap-5">
                        <span>Retourner à l'accueil</span>
                        <CornerDownLeft/>
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="w-screen h-full flex flex-col justify-center items-start gap-8 py-30 px-24">
            <h2 className="text-3xl font-bold dark:text-white">Notre dernier article</h2>
            {lastArticle.docs.map((article) => {
                const type = types.find(cat => cat.slug == article.type) || { name: article.type, color: 'bg-gray-500' };
                const category = categories.find(cat => cat.slug == article.category) || { name: article.category, color: 'bg-gray-500' }
                return (
                    <div key={article.id} className='flex relative w-full h-full'>
                        <div className="flex flex-col gap-4 absolute z-0 w-full rounded-3xl">
                            {typeof article.featuredImage === 'object' && article.featuredImage !== null ? (
                                <img src={`${(process.env.NEXT_PUBLIC_SERVER_URL ?? '') + article.featuredImage.url}`} alt={article.title} className="h-96 object-cover rounded-3xl" />
                            ) : null}
                            <div className='absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm rounded-3xl'></div>
                        </div>

                        <div className="flex flex-col gap-4 z-20 relative h-96 w-full pt-8 pb-6 px-12 text-white">
                            <div className='flex justify-between gap-4 h-full w-full'>
                                <div className='flex flex-col justify-between w-full pr-12'>
                                    <div className='flex flex-col gap-8 justify-center h-full'>
                                        <h3 className="text-3xl font-bold">{article.title}</h3>
                                        <p className="text-xl text-gray-300">{article.excerpt}</p>
                                    </div>
                                    <p className="text-md text-gray-300">Publié le {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }) : 'Date inconnue'}</p>
                                </div>
                                <div className='w-6/12 h-fit flex flex-wrap gap-1 gap-y-3 justify-end absolute right-0 top-0 p-4'>
                                    <span className={`rounded-xl py-1 px-3 text-sm ${type.color || 'bg-gray-500'}`}>{type.name || article.type}</span>
                                    <span className={`rounded-xl py-1 px-3 text-sm ${category.color || 'bg-gray-500'}`}>{category.name || article.category}</span>
                                </div>
                            </div>

                            <Link href={`/blog/category/${article.category}/article/${article.slug}`} className="flex bg-teal-500 bottom-0 right-0 absolute rounded-tl-3xl rounded-br-3xl px-4 py-3">
                                <span>Lire l'article</span>
                                <ChevronRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default LastArticle;
