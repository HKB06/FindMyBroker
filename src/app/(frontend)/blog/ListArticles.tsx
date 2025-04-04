import { fetchArticles } from '@/lib/articles';
import Link from 'next/link';
import { types } from '@/lib/types';
import { categories } from '@/lib/categories';
import { ChevronRight } from 'lucide-react';

export default async function ListArticles({
    category,
    numberPerPage,
    page = 1,
    paginate = false,
}: {
    category: string | null;
    numberPerPage: number;
    page?: number;
    paginate?: boolean;
}) {
    const defaultCategory = 'general';
    const categoryToUse = category || defaultCategory;

    const { docs: articles, totalPages, page: currentPage } = await fetchArticles(
        categoryToUse,
        numberPerPage,
        page
    );

    return (
        <div className="h-max w-full">
            {articles.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
                        {articles.map((article) => {
                            const type = types.find((cat) => cat.slug == article.type) || {
                                name: article.type,
                                color: 'bg-gray-500',
                            };
                            const cat = categories.find((cat) => cat.slug == article.category) || {
                                name: article.category,
                                color: 'bg-gray-500',
                            };

                            return (
                                <div key={article.id} className="flex relative w-full h-full">
                                    <div className="flex flex-col gap-4 absolute z-0 w-full rounded-3xl">
                                        {typeof article.featuredImage === 'object' && article.featuredImage !== null ? (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}${article.featuredImage.url}`}
                                                alt={article.title}
                                                className="h-96 object-cover rounded-3xl"
                                            />
                                        ) : null}
                                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm rounded-3xl"></div>
                                    </div>

                                    <div className="flex flex-col gap-4 z-20 relative h-96 w-full pt-8 pb-6 px-12 text-white">
                                        <div className="flex justify-between gap-4 h-full w-full">
                                            <div className="flex flex-col justify-between w-full">
                                                <div className="flex flex-col gap-8 justify-center h-full">
                                                    <h3 className="text-xl font-bold">{article.title}</h3>
                                                    <p className="text-xl text-gray-300">{article.excerpt}</p>
                                                </div>
                                                <p className="text-sm text-gray-300">
                                                    Publié le{' '}
                                                    {article.publishedAt
                                                        ? new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })
                                                        : 'Date inconnue'}
                                                </p>
                                            </div>
                                            <div className="w-/12 h-fit flex gap-1 gap-y-3 justify-end absolute right-0 top-0 p-4">
                                                <span className={`rounded-xl py-1 px-3 text-sm ${type.color}`}>{type.name}</span>
                                                <span className={`rounded-xl py-1 px-3 text-sm ${cat.color}`}>{cat.name}</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/blog/${article.slug}`}
                                            className="flex bg-teal-500 bottom-0 right-0 absolute rounded-tl-3xl rounded-br-3xl px-4 py-3"
                                        >
                                            <span>Lire l'article</span>
                                            <ChevronRight className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalPages > 1 && paginate === true && (
                        <nav className="flex justify-center mt-12 gap-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Link
                                    key={i}
                                    href={`?page=${i + 1}`}
                                    className={`px-4 py-2 rounded-full border text-white ${currentPage === i + 1 ? 'bg-teal-500 border-teal-500' : 'border-gray-500'
                                        }`}
                                >
                                    {i + 1}
                                </Link>
                            ))}
                        </nav>
                    )}
                </>
            ) : (
                <p className="text-white text-lg">Aucun article trouvé dans cette catégorie. 🤕</p>
            )}
        </div>
    );
}