import React from 'react';
import { getPayloadInstance } from '@/lib/payload';
import { notFound } from 'next/navigation';
import { types } from '@/lib/types';
import { categories } from '@/lib/categories';
import { RichText } from '@/components/blog/RichText';
import './article.css';
import ArticleContent from '@/components/blog/ArticleContent';

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
                    level: parseInt(node.tag.charAt(1)), // h2 -> 2, h3 -> 3, etc.
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

function formatSlug(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
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
    const tableOfContents = articleData.content ? extractTableOfContents(articleData.content) : [];

    return (
        <div className="w-screen! h-full! flex! flex-col! justify-center! items-start! py-30! md:px-24! px-8! gap-12!">
            <div className="flex! relative! w-full! h-full!">
                <div className="flex! flex-col! gap-4! absolute! z-0! w-full! rounded-3xl! h-full!">
                    {typeof articleData.featuredImage === 'object' && articleData.featuredImage !== null ? (
                        <img src={`${(process.env.NEXT_PUBLIC_SERVER_URL ?? '') + articleData.featuredImage.url}`} alt={articleData.title} className="h-full! object-cover! rounded-3xl!" />
                    ) : null}
                    <div className="absolute! top-0! left-0! w-full! h-full! bg-black/50! backdrop-blur-sm! rounded-3xl!"></div>
                </div>
                <div className="flex! flex-col! gap-4! z-20! relative! h-96! w-full! pt-8! pb-6! px-12! text-white!">
                    <div className="flex! justify-between! gap-4! h-full! w-full!">
                        <div className="flex! flex-col! justify-between! w-full! pr-12!">
                            <div className="flex! flex-col! gap-8! justify-center! h-full!">
                                <h3 className="md:text-3xl! font-bold! text-white!">{articleData.title}</h3>
                                <p className="md:text-xl! text-gray-300!">{articleData.excerpt}</p>
                            </div>
                            <p className="md:text-md! text-gray-300!">Publié le {articleData.publishedAt ? new Date(articleData.publishedAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) : 'Date inconnue'}</p>
                        </div>
                        <div className="w-6/12! h-fit! flex! flex-wrap! gap-1! gap-y-3! justify-end! absolute! right-0! top-0! p-4!">
                            <span className={`rounded-xl! py-1! px-3! md:text-sm! text-xs! ${type.color || 'bg-gray-500!'}`}>{type.name || articleData.type}</span>
                            <span className={`rounded-xl! py-1! px-3! md:text-sm! text-xs! ${category.color || 'bg-gray-500!'}`}>{category.name || articleData.category}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ArticleContent content={articleData.content} category={articleData.category} tags={articleData?.tags} />
        </div>
    );
};

export default ArticlePage;