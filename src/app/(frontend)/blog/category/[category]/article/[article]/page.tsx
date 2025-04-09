import React from 'react';
import { getPayloadInstance } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { types } from '@/lib/types';
import { categories } from '@/lib/categories';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import './article.css';
import ArticleContent from '@/components/blog/ArticleContent';
import { Warehouse } from 'lucide-react';
import Link from 'next/link';

interface Params {
    article: string;
}

interface TableOfContentsItem {
    id: string;
    title: string;
    level: number;
}

function extractTableOfContents(content: any): TableOfContentsItem[] {
    const toc: TableOfContentsItem[] = [];
    const traverse = (node: any) => {
        if (node.type === "heading") {
            const headingText = node.children?.[0]?.text ?? "";
            if (headingText && node.attributes?.id) {
                toc.push({
                    id: node.attributes.id,
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

    if (!articleData) {
        notFound();
    }

    const type = types.find(cat => cat.slug == articleData.type) || { name: articleData.type, color: 'bg-gray-500!' };
    const category = categories.find(cat => cat.slug == articleData.category) || { name: articleData.category, color: 'bg-gray-500!' };

    return (
        <div className="w-screen! h-full! flex! flex-col! justify-center! items-start! py-30! md:px-24! px-8! gap-8!">

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/blog/category/${articleData.category}`} className='first-letter:uppercase'>{articleData.category}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className='font-bold'>{articleData.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex relative w-full h-full'>
                <div className="flex flex-col gap-4 absolute z-0 w-full rounded-3xl">
                    {typeof articleData.featuredImage === 'object' && articleData.featuredImage !== null ? (
                        <img src={`${(process.env.NEXT_PUBLIC_SERVER_URL ?? '') + articleData.featuredImage.url}`} alt={articleData.title} className="h-96 object-cover rounded-3xl" />
                    ) : null}
                    <div className='absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm rounded-3xl'></div>
                </div>

                <div className="flex flex-col gap-4 z-20 relative h-96 w-full pt-8 pb-6 px-4 md:px-12 text-white">
                    <div className='flex justify-between gap-4 h-full w-full'>
                        <div className='flex flex-col justify-between w-full'>
                            <div className='flex flex-col gap-2 md:gap-8 justify-center h-full'>
                                <h3 className="text-xl md:text-3xl font-bold">{articleData.title}</h3>
                                <p className="text-md md:text-xl text-gray-300">{articleData.excerpt}</p>
                            </div>
                            <p className="text-sm md:text-base">Publié le {articleData.publishedAt ? new Date(articleData.publishedAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) : 'Date inconnue'}</p>
                        </div>
                        <div className='w-full md:w-6/12 h-fit flex items-center gap-1 gap-y-3 justify-end absolute right-0 top-0 p-4'>
                            <span className={`rounded-xl py-1 px-3 text-sm ${type.color || 'bg-gray-500'}`}>{type.name || articleData.type}</span>
                            <span className={`rounded-xl py-1 px-3 text-sm ${category.color || 'bg-gray-500'}`}>{category.name || articleData.category}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ArticleContent content={articleData.content} category={articleData.category} tags={articleData?.tags} />
        </div>
    );
};

export default ArticlePage;