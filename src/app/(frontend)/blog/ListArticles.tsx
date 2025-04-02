import { fetchArticles } from '@/lib/articles';
import Link from 'next/link';

export default async function ListArticles({ category }: { category: string | null }) {
    const defaultCategory = 'general'; 
    const categoryToUse = category || defaultCategory;

    const articles = await fetchArticles(categoryToUse);

    return (
        <div className="mt-8 w-full max-w-4xl">
            {articles.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {articles.map((article) => (
                            <div key={article.id} className="p-4 bg-white rounded-lg shadow-md">
                                <h4 className="text-lg font-bold">{article.title}</h4>
                                <p className="text-gray-700 text-sm">{article.excerpt}</p>
                                <Link href={`/blog/${article.slug}`} className="text-blue-500 text-sm mt-2 inline-block">Lire l'article</Link>
                            </div>
                        ))}
                    </div>
                    {articles.length > 6 && (
                        <div className="mt-4 text-center">
                            <Link 
                                href={`/blog/category/${categoryToUse}`} 
                                className="px-4 py-2 bg-blue-500 text-white rounded-full"
                            >
                                Voir plus d'articles
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-white text-lg">Aucun article trouvé 🤕.</p>
            )}
        </div>
    );
}