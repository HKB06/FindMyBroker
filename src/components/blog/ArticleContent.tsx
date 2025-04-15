import React from 'react';
import { RichText } from './RichText';
import BrokerRecommandationByCategory from './BrokerRecommandationByCategory';
import { categories } from '@/lib/categories';
import ListArticles from '@/app/(frontend)/blog/ListArticles';
import Link from 'next/link';

interface TableOfContentsItem {
    id: string;
    title: string;
    level: number;
}

interface ArticleContentProps {
    content: any;
    category: string;
    tags: { tag?: string | null; id?: string | null }[] | null | undefined;
}

function extractTableOfContents(content: any): TableOfContentsItem[] {
    const toc: TableOfContentsItem[] = [];
    const traverse = (node: any) => {
        if (node.type === 'heading') {
            const headingText = node.children?.[0]?.text ?? '';
            if (headingText) {
                const id = headingText
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '');

                toc.push({
                    id,
                    title: headingText,
                    level: parseInt(node.tag.charAt(1)),
                });
            }
        }
        if (node.children) {
            node.children.forEach(traverse);
        }
    };
    traverse(content.root);
    return toc;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, category, tags }) => {
    const tableOfContents = extractTableOfContents(content);
    const categoryInfo = categories.find(cat => cat.slug === category) || {
        name: category,
        color: 'bg-gray-500',
        pres: ''
    };

    // if (!tableOfContents || tableOfContents.length === 0) {
    //     return null;
    // }

    return (
        <div className="relative! w-full">
            <div className="flex! flex-col! w-full! justify-center! gap-8">
                {content && tableOfContents.length > 0 && (
                    <div className='flex! md:gap-8! w-full! justify-center! flex-col md:flex-row'>
                        <aside className="md:w-1/3! w-full!">
                            <div className="top-20 left-24 mb-10 w-full! max-w-xs rounded-3xl border bg-white px-6 py-6 shadow-md lg:sticky lg:w-full">
                                <div className="pb-2 text-xl font-medium text-green-dark">Table des matières</div>
                                <hr className="h-1 w-10 bg-green-light" />
                                <div className="mt-4 flex flex-col gap-2">
                                    {tableOfContents.map((item) => (
                                        <a href={`#${item.id}`} key={item.id} className={`ml-${item.level * 4} text-black hover:text-green-dark`}>
                                            <span
                                                className="text-sm font-medium mb-1"
                                            >
                                                {item.title}
                                            </span>
                                        </a>
                                    ))}
                                    {category !== "autre" && (
                                        <>
                                            <hr className='my-3' />
                                            <a href="#recommandations-brokers" className='bg-gradient-to-r from-green-dark to-green-light text-transparent bg-clip-text font-black hover:from-green-light hover:to-green-dark'>Recommandations brokers</a>
                                            <a href="#meme-sujet" className='mt-1 hover:text-green-dark'>Sur le même sujet</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </aside>
                        <div className="flex flex-col gap-8 w-full! h-full!">
                            <div className="bg-white! rounded-3xl! border! md:p-8! p-6 shadow-md">
                                <RichText
                                    data={content}
                                    className="article-page flex! flex-col! justify-center! items-center! text-justify!"
                                />
                                <div className='flex flex-col gap-2'>
                                    <h4 className='italic'>Tags :</h4>
                                    <div className="flex gap-2">
                                        {tags && (
                                            tags.map((tag) =>
                                                <span key={tag.id} className="md:px-4 px-2 md:py-1 bg-gray-700 rounded-full text-white">{tag.tag}</span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {category !== "autre" && (
                    <div className='flex flex-col gap-8'>
                        <div className={`${categoryInfo.color} p-6 md:p-12 rounded-3xl shadow-md`}>
                            <h2 className="text-2xl md:text-3xl font-bold text-white pb-8" id="recommandations-brokers">Nos recommandations de brokers pour cette catégorie</h2>
                            <BrokerRecommandationByCategory category={category} />
                        </div>
                        <div className={`bg-white border p-6 md:p-12 rounded-3xl shadow-md`}>
                            <h2 className="text-2xl md:text-3xl font-bold text-black w-full pb-4" id="recommandations-brokers">Sur le même sujet</h2>
                            <div className='flex flex-col justify-center gap-8 items-start'>
                                <ListArticles category={category} numberPerPage={2} />
                                <Link href={`/blog/category/${category}`} className={`text-white text-md bg-violet-900 rounded-lg px-4 py-2 text-center w-full md:w-fit`}>Voir tous les articles sur {categoryInfo.pres}</Link>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-gray-500 text-sm w-full max-w-2xl">
                    <h2 className='text-2xl md:text-3xl font-bold text-black w-full pb-4'>Découvrez nos autres catégories :</h2>
                    <div className="flex flex-wrap justify-start md:justify-center gap-2 mt-3">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/blog/category/${category.slug}`}
                                className={`px-3 py-1 text-white rounded-full cursor-pointer transition ${category.color}`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleContent;